const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const cors = require('cors');

const app = express();

// Разрешить все CORS запросы
app.use(cors());

// Логирование всех запросов
app.use((req, res, next) => {
  console.log(`📥 Request: ${req.method} ${req.url}`);
  next();
});

// Прокси для API запросов
app.use('/api', createProxyMiddleware({
  target: 'https://ai-chat-platform-backend-production.up.railway.app',
  changeOrigin: true,
  secure: true,
  logLevel: 'debug',
  pathRewrite: {
    '^/api': '/api', // Оставляем путь как есть
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log('🔄 Proxying:', req.method, req.url, '→', proxyReq.path);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log('✅ Response:', proxyRes.statusCode, req.url);
  },
  onError: (err, req, res) => {
    console.error('❌ Proxy error:', err.message);
  }
}));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🔄 Proxy server running on http://localhost:${PORT}`);
  console.log('Use this URL in your frontend: NEXT_PUBLIC_BACKEND_URL=http://localhost:8080');
});