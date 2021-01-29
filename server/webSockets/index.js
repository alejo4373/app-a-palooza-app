const WebSocket = require('ws')

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
  var wss = new WebSocket.Server({ server })

  wss.on('connection', (ws) => {
    ws.isAlive = true
    ws.on('pong', heartbeat)
    ws.on('message', (data) => { })

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
