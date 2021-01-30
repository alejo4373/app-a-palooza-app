const { createProxyMiddleware } = require('http-proxy-middleware');

const wsProxy = createProxyMiddleware('/my-websockets', {
  target: 'http://localhost:3001',
  ws: true
})

const apiProxy = createProxyMiddleware('/api', {
  target: 'http://localhost:3001',
})

module.exports = (app) => {
  app.use(apiProxy)
  app.use(wsProxy)
}
