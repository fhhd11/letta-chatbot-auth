# Railway Deployment Guide

## Подготовка к деплою

### 1. Переменные окружения

В Railway нужно установить следующие переменные окружения:

```
NODE_ENV=production
PORT=3000

# Backend Integration
NEXT_PUBLIC_BACKEND_URL=https://ai-chat-platform-backend-production.up.railway.app

# Letta Server Settings
LETTA_API_KEY=password
LETTA_BASE_URL=https://lettalettalatest-production-a3ba.up.railway.app

# Letta Global API Key
NEXT_PUBLIC_LETTA_GLOBAL_KEY=sk-cqLMbuQX4YsLpQZThiX0Ag

# Authentication
USE_COOKIE_BASED_AUTHENTICATION=false
NEXT_PUBLIC_CREATE_AGENTS_FROM_UI=false
```

### 2. Команды деплоя

Railway автоматически выполнит:
- `npm install` - установка зависимостей
- `npm run build` - сборка проекта
- `npm start` - запуск продакшн сервера

### 3. Health Check

Приложение имеет health check эндпоинт: `/api/health`

### 4. Особенности деплоя

- Используется Next.js 15 с Turbopack
- Авторизация через JWT токены из backend
- Проксирование запросов к backend через `/api/proxy`
- Интеграция с Letta AI для чат-ботов

### 5. Проверка после деплоя

1. Откройте URL приложения Railway
2. Попробуйте залогиниться с учетными данными
3. Проверьте работу чата с агентом
4. Убедитесь, что история сообщений загружается

### 6. Troubleshooting

Если возникают ошибки:
- Проверьте логи в Railway dashboard
- Убедитесь, что все переменные окружения установлены
- Проверьте доступность backend и Letta серверов
- Проверьте работу proxy эндпоинтов