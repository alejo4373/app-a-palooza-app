const { createProxyMiddleware } = require('http-proxy-middleware');

/* 
Doesn't work
Looks like proxy are created at the wrong endpoint (Root /)

[HPM] Proxy created: /  -> http://localhost:3001
[HPM] Subscribed to http-proxy events: [ 'error', 'close' ]
[HPM] Proxy created: /  -> http://localhost:3001
[HPM] Subscribed to http-proxy events: [ 'error', 'close' ]

- My socket connection (/alejo-ws) works only after refreshing the page and not on the first app load. The request never touches my server on the first load.
- On first load app connects to wds /sockjs-node as seen by the initial messages sent then in subsequent manual reloads looks like it connects the proxy kicks in and tries to connect to my server as seen by the error and by my backend. After this hot reload doesn't work.

/*
[HPM] GET /sockjs-node -> http://localhost:3001
[HPM] Upgrading to WebSocket
[HPM] GET /api/users/current -> http://localhost:3001
[HPM] Error occurred while trying to proxy request /sockjs-node from 192.168.1.145:3000 to http://localhost:3001 (ECONNRESET) (https://nodejs.org/api/errors.html#errors_common_system_errors)
[HPM] GET /alejo-ws -> http://localhost:3001
[HPM] Upgrading to WebSocket
[HPM] GET /api/job-applications/community/goal -> http://localhost:3001
[HPM] GET /api/job-applications/community/count -> http://localhost:3001
[HPM] GET /api/job-applications/user/count -> http://localhost:3001
*/
module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      logLevel: 'debug',
    })
  )
  app.use(
    '/alejo-ws',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      logLevel: 'debug',
      ws: true
    })
  )
}
