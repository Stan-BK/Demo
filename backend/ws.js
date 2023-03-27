const http = require('http');
const ws = require('ws');

const wss = new ws.Server({ noServer: true });
const players = []
let id = 0

function accept(req, res) {
  // all incoming requests must be websockets
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
    res.end();
    return;
  }

  // can be Connection: keep-alive, Upgrade
  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    res.end();
    return;
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
  const newPlayer = {
    id: id++,
    ws
  }
  newPlayer.pos = JSON.stringify({
    x: 0,
    y: 0,
    z: 0
  })
  sendNewPlayer(newPlayer)
  ws.on('message', function (message) {
    newPlayer.pos = message.toString()
    // setTimeout(() => ws.close(1000, "Bye!"), 5000);
    sendPlayersPos(newPlayer)
  });
}

function sendPlayersPos(player) {
  players.forEach(item => item !== player && item.ws.send(JSON.stringify({
    type: 'move',
    id: player.id,
    pos: player.pos
  })))
}

function sendNewPlayer(player) {
  const arr = []
  players.forEach(item => {
    const o = {
      id: item.id,
      pos: item.pos
    }
    arr.push(o)
    item.ws.send(JSON.stringify({
      type: 'add',
      id: player.id,
      pos: player.pos
    }))
  })
  player.ws.send(JSON.stringify({
    type: 'move',
    pos: arr
  }))
  players.push(player)
}

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}