const { createProxyMiddleware } = require('http-proxy-middleware');

/* 
- Looks like proxy are created at the wrong endpoint (Root /)

[HPM] Proxy created: /  -> http://localhost:3001
[HPM] Subscribed to http-proxy events: [ 'error', 'close' ]
[HPM] Proxy created: /  -> http://localhost:3001
[HPM] Subscribed to http-proxy events: [ 'error', 'close' ]

- This is exactly the same as the approach that works but 
with the path being specified in the createProxyMiddleware
as well as the app.use(). This still doesn't work and I think
is because the app.use() with the path

*/
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
  app.use('/alejo-ws', wsProxy)
  app.use('/api', apiProxy)
}
