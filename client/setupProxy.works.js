const { createProxyMiddleware } = require('http-proxy-middleware');

const wsProxy = createProxyMiddleware('/alejo-ws', {
  target: 'http://localhost:3001',
  logLevel: 'debug',
  ws: true
})

const apiProxy = createProxyMiddleware('/api', {
  target: 'http://localhost:3001',
  logLevel: 'debug',
})

module.exports = (app) => {
  app.use(apiProxy)
  app.use(wsProxy)
}
