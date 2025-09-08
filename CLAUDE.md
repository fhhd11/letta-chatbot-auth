# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the Next.js application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Check code formatting with Prettier
- `npm run format:fix` - Auto-fix code formatting issues with Prettier

**Testing:**
- Cypress is configured for e2e testing but no npm script is defined
- Run Cypress directly using `npx cypress open` or `npx cypress run`

## Architecture

Это **шаблон умного чат-бота** построенный на Next.js 15+, который создает состояние-сохраняющих AI агентов с возможностями памяти. Приложение использует API для управления разговорными агентами, которые могут обучаться и запоминать между сессиями.

### Core Architecture Components

**Backend API Structure (`/src/app/(server)/api/`):**
- `/agents` - CRUD operations for agent management, uses cookie-based user sessions
- `/agents/[agentId]/messages` - Message handling and streaming chat responses
- `/agents/[agentId]/archival_memory` - Agent's archival memory management
- `/runtime` - Runtime configuration and health checks

**Frontend Structure (`/src/app/`):**
- Root layout with multiple context providers (Sidebar, AgentDetails, ReasoningMessage, Dialog)
- Dynamic routing with `[agentId]` for agent-specific chat interfaces
- Component-based architecture using shadcn/ui with Tailwind CSS

**Key State Management:**
- Agent context using React Context API for current agent state
- Cookie-based user sessions for multi-user support (can be disabled)
- React Query for server state management

### Configuration Files

**Agent Configuration (`default-agent.json`):**
- Defines default memory blocks (human, persona)
- Specifies default LLM model (`letta/letta-free`)
- Sets default embedding model
- Used when creating new agents via the API

**Environment Setup (`.env`):**
- `LETTA_API_KEY` - Authentication token for Letta API
- `LETTA_BASE_URL` - Letta server URL (default: http://localhost:8283)
- `USE_COOKIE_BASED_AUTHENTICATION` - Enable/disable user sessions
- `NEXT_PUBLIC_CREATE_AGENTS_FROM_UI` - Show/hide agent creation UI

### Dependencies & Integrations

**Core Framework:**
- Next.js 15+ with App Router
- TypeScript for type safety
- Tailwind CSS + shadcn/ui for styling

**Letta Integration:**
- `@letta-ai/letta-client` - TypeScript SDK for Letta API
- `@letta-ai/vercel-ai-sdk-provider` - Vercel AI SDK provider for Letta
- `@ai-sdk/react` - React hooks for AI interactions

**State & Data:**
- `@tanstack/react-query` - Server state management
- React Context API for global state
- Cookie-based session management

### Development Notes

- Requires a running Letta server (local via Docker/Desktop or Letta Cloud)
- Agent state is persisted via Letta's API, not local storage
- The app supports multiple users through cookie-based sessions
- Agent creation uses the configuration from `default-agent.json`
- Message streaming is implemented using Vercel AI SDK patterns