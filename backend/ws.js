const http = require('http');
const ws = require('ws');

const wss = new ws.Server({ noServer: true });
const players = []

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
  players.push(ws)
  ws.pos = '(0, 0, 0)'
  getPlayersPos(ws)
  ws.on('message', function (message) {
    ws.pos = message.toString()
    // setTimeout(() => ws.close(1000, "Bye!"), 5000);
    getPlayersPos(ws)
  });
}

function getPlayersPos(ws) {
  const arr = []
  for (let i = 0; i < players.length; i++) {
    const player = players[i]
    if (player === ws) continue
    arr.push(player.pos)
  }
  console.log(arr)
  players.forEach(item => item.send(arr.toString()))
}

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}