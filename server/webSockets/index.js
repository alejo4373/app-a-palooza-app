const WebSocket = require('ws')
const url = require('url')

const sendTo = (socket, data) => {
  socket.send(JSON.stringify(data))
}

function heartbeat() {
  this.isAlive = true;
}
/**
 * Web Socket Server setup
 */
const init = (server) => {
  var wss = new WebSocket.Server({ noServer: true })

  server.on('upgrade', (req, socket, head) => {
    const pathname = url.parse(req.url).pathname
    if (pathname === '/alejo-ws') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req)
      })
    } else {
      console.log('Invalid socket connection attempt')
      socket.destroy()
    }
  })

  wss.on('connection', (ws) => {
    ws.isAlive = true
    ws.on('pong', heartbeat)
    ws.on('message', (data) => { })

    console.log('A client Connected')
    sendTo(ws, { message: 'CLIENT_CONNECTED' })
  })

  /**
   * Monitor for inactive clients every 30secs
   * and terminate inactive/dead clients
   */
  const interval = setInterval(() => {
    console.log('Clients connected:', wss.clients.size)
    wss.clients.forEach(client => {
      if (!client.isAlive) {
        console.log('client.isAlive', client.isAlive, 'terminating -->')
        return client.terminate()
      }
      client.isAlive = false
      client.ping()
    })
  }, 1000 * 30)

  wss.on('close', (e) => {
    console.log('Connection closed', e)
    clearInterval(interval)
  })

  return {
    broadcast: (payload) => {
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(payload))
        }
      })
    }
  }
}



module.exports = {
  init
}
