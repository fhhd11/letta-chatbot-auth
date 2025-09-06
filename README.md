# Letta Chatbot with Authentication System

A Next.js 15 application that provides a secure chatbot interface using Letta AI with user authentication and personal agent assignment.

<div align="center">

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/new)

</div>

> [!NOTE]
> This project extends the original [Letta Chatbot Template](https://github.com/letta-ai/letta-chatbot-example) with JWT authentication, backend integration, and Railway deployment support.

## ✨ Features

✅ **JWT-based Authentication** - Secure login/register system with token management  
✅ **Personal Agent Assignment** - Each user gets their own dedicated Letta AI agent  
✅ **Persistent Message History** - Chat history with proper authentication and loading  
✅ **Backend Integration** - Seamless integration with external authentication API  
✅ **Railway Deployment Ready** - Optimized configuration for Railway hosting  
✅ **Responsive Design** - Works perfectly on desktop and mobile devices  
✅ **CORS Proxy** - Built-in proxy to handle cross-origin requests  
✅ **Health Monitoring** - Health check endpoints for deployment monitoring  

### Core Letta Features

- **[Letta AI Framework](https://github.com/letta-ai/letta)** - Stateful LLM applications with memory
- **Agent State Management** - Configured via `default-agent.json`
- **Streaming Responses** - Real-time message streaming
- **Memory Persistence** - Agents remember conversation context

## 🛠 Tech Stack

**Frontend:**
- **[Next.js 15](https://nextjs.org)** - App Router, SSR, and performance optimizations
- **[React 18](https://reactjs.org)** - Component-based UI architecture  
- **[TypeScript](https://www.typescriptlang.org)** - Static typing and enhanced developer experience
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Shadcn UI](https://ui.shadcn.com)** - Modern, accessible component library

**Backend & AI:**
- **[Letta TypeScript SDK](https://github.com/letta-ai/letta-node)** - Letta API integration
- **[Vercel AI SDK](https://ai-sdk.dev/docs/introduction)** - Streaming responses and chat UI
- **JWT Authentication** - Secure token-based auth system
- **API Proxy** - CORS handling and request routing

**Deployment:**
- **[Railway](https://railway.app)** - Optimized hosting platform
- **Docker Ready** - Containerized deployment support
- **Health Monitoring** - Built-in health check endpoints

---

# ⚡️ Quickstart

### 📋 Prerequisites

- **[Node.js 18+](https://nodejs.org/en/download/)** and npm
- **Backend API** for authentication (see Environment Variables)  
- **Letta Server** access ([Local](https://docs.letta.com/quickstart) or [Cloud](https://docs.letta.com/guides/cloud/overview))

## 🚀 Quick Start

### 1️⃣ Clone and Install

```bash
# Clone this repository
git clone https://github.com/fhhd11/letta-chatbot-auth.git
cd letta-chatbot-auth

# Install dependencies
npm install
```

### 2️⃣ Environment Setup

```bash
# Copy environment template
cp .env.template .env.local
```

Edit `.env.local` with your configuration:

```env
# Backend Integration (Required)
NEXT_PUBLIC_BACKEND_URL=your-backend-api-url

# Letta Server Configuration (Required)  
LETTA_API_KEY=your-letta-api-key
LETTA_BASE_URL=your-letta-server-url
NEXT_PUBLIC_LETTA_GLOBAL_KEY=your-letta-global-key

# Authentication Settings
USE_COOKIE_BASED_AUTHENTICATION=false
NEXT_PUBLIC_CREATE_AGENTS_FROM_UI=false
```

### 3️⃣ Configure Agent (Optional)

Update `default-agent.json` with your preferred agent settings:
- Persona description  
- Memory blocks
- LLM model preferences

### 4️⃣ Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start chatting! 🎉

---

## 🚢 Deployment

### Railway Deployment (Recommended)

This project is optimized for [Railway](https://railway.app) deployment:

1. **Connect Repository**: Link your GitHub repo to Railway
2. **Set Environment Variables**: Copy variables from `.env.production` 
3. **Deploy**: Railway handles build and deployment automatically

📖 **[Detailed Railway Deployment Guide →](./RAILWAY_DEPLOY.md)**

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server  
npm start

# Or with custom port
PORT=3000 npm start
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── (server)/api/      # Server-side API routes
│   │   ├── agents/        # Letta agent management
│   │   ├── proxy/         # Backend API proxy
│   │   └── health/        # Health monitoring
│   ├── login/            # Authentication pages
│   ├── register/         
│   └── chat/            # Main chat interface
├── components/           # Reusable UI components
├── context/             # React Context providers
├── services/           # API client services
└── types/             # TypeScript definitions
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|:--------:|
| `NEXT_PUBLIC_BACKEND_URL` | Authentication backend API URL | ✅ |
| `LETTA_API_KEY` | Letta server access token | ✅ |
| `LETTA_BASE_URL` | Letta server endpoint URL | ✅ |
| `NEXT_PUBLIC_LETTA_GLOBAL_KEY` | Letta global access key | ✅ |
| `USE_COOKIE_BASED_AUTHENTICATION` | Enable legacy cookie auth | ✅ |
| `NEXT_PUBLIC_CREATE_AGENTS_FROM_UI` | Show agent creation UI | ✅ |

## 🛠 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Check code formatting
npm run format:fix   # Fix code formatting
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📚 Documentation

- 📖 [Railway Deployment Guide](./RAILWAY_DEPLOY.md)
- 🔧 [Claude Code Instructions](./CLAUDE.md)
- 🌐 [Letta Documentation](https://docs.letta.com)

## 🆘 Support

- 🐛 [Report Issues](https://github.com/fhhd11/letta-chatbot-auth/issues)
- 💬 [Letta Discord](https://discord.com/invite/letta)

## 📜 License

Based on [Letta Chatbot Template](https://github.com/letta-ai/letta-chatbot-example) with additional authentication and deployment features.

---

<div align="center">

**Built with ❤️ using [Letta AI](https://letta.ai), [Next.js](https://nextjs.org), and [Railway](https://railway.app)**

</div>
