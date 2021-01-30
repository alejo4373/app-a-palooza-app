const { createProxyMiddleware } = require('http-proxy-middleware');

/*
Doesn't work
Looks like proxy are created at the wrong endpoint (Root /)

[HPM] Proxy created: /  -> http://localhost:3001
[HPM] Subscribed to http-proxy events: [ 'error', 'close' ]
[HPM] Proxy created: /  -> http://localhost:3001
[HPM] Subscribed to http-proxy events: [ 'error', 'close' ]
*/
const wsProxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  logLevel: 'debug',
  ws: true
})

const apiProxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  logLevel: 'debug',
})

module.exports = (app) => {
  app.use('/api', apiProxy)
  app.use('/alejo-ws', wsProxy)
}
