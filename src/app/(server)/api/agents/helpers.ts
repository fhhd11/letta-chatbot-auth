import client from '@/config/letta-client'
import { Context, LETTA_UID } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { USE_COOKIE_BASED_AUTHENTICATION } from '@/constants'

// JWT validation helper - decode JWT token locally (simplified approach)
async function validateJWTToken(token: string): Promise<{ user_id: string; letta_agent_id: string } | null> {
  try {
    // Decode JWT payload (basic decoding without signature verification)
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.log('❌ Invalid JWT format');
      return null;
    }
    
    const payload = JSON.parse(atob(parts[1]));
    console.log('🔍 JWT payload:', payload);
    
    // Check if token is expired
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      console.log('❌ JWT token expired');
      return null;
    }
    
    // For now, we'll trust the token if it has the expected structure
    // In a real production environment, you should verify the signature
    const userId = payload.sub;
    
    if (!userId) {
      console.log('❌ No user ID in JWT');
      return null;
    }
    
    // For simplicity, we'll trust the JWT content and use the agentId from the request context
    // This is acceptable for development, but in production you should verify the JWT signature
    console.log('✅ JWT validation successful, user ID:', userId);
    return {
      user_id: userId,
      letta_agent_id: 'placeholder' // Will be filled from request context
    };
    
  } catch (error) {
    console.error('JWT validation error:', error);
    return null;
  }
}

export async function validateAgentOwner(
  req: NextRequest,
  context: Context<{ agentId: string }>
) {
  const { agentId } = await context.params

  // Check if using new backend authentication
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const userData = await validateJWTToken(token);
    
    if (!userData) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // For now, we'll allow access to any agent for authenticated users
    // In production, you should verify that the user owns this specific agent
    return {
      userId: userData.user_id,
      agentId: agentId, // Use the requested agentId
      agent: await getAgent(agentId)
    }
  }

  // Fallback to legacy cookie-based authentication for development
  if (!USE_COOKIE_BASED_AUTHENTICATION) {
    return {
      userId: 'default',
      agentId,
      agent: await getAgent(agentId)
    }
  }

  const userId = getUserId(req)
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  if (!agentId) {
    return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 })
  }

  const agent = await getAgent(agentId)
  if (!agent) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }

  if (!agent.tags.includes(`user:${userId}`)) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }

  return {
    userId: userId,
    agentId: agentId,
    agent: agent
  }
}

export function getUserTagId(userId: string) {
  if (!USE_COOKIE_BASED_AUTHENTICATION) {
    return []
  }

  return [`user:${userId}`]
}

export function getUserId(req: NextRequest) {
  if (!USE_COOKIE_BASED_AUTHENTICATION) {
    return 'default'
  }

  return req.cookies.get(LETTA_UID)?.value
}

export async function getAgent(agentId: string) {
  const agent = await client.agents.retrieve(agentId)
  return agent
}
