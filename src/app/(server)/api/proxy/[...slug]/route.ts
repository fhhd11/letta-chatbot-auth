import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  return proxyRequest(request, slug)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  return proxyRequest(request, slug)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  return proxyRequest(request, slug)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  return proxyRequest(request, slug)
}

export async function OPTIONS(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  return proxyRequest(request, slug)
}

async function proxyRequest(request: NextRequest, slug: string[]) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ai-chat-platform-backend-production.up.railway.app'
  const path = slug.join('/')
  const url = `${backendUrl}/api/${path}`
  
  console.log('🔄 Proxy request:', request.method, url)

  try {
    const body = request.body ? await request.text() : undefined
    
    const response = await fetch(url, {
      method: request.method,
      headers: {
        'Content-Type': request.headers.get('content-type') || 'application/json',
        'Authorization': request.headers.get('authorization') || '',
      },
      body: body && body.length > 0 ? body : undefined,
    })

    const data = await response.text()
    console.log('✅ Proxy response:', response.status, response.statusText, 'Data:', data)

    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('❌ Proxy error:', error)
    return NextResponse.json(
      { error: 'Proxy request failed' },
      { status: 500 }
    )
  }
}