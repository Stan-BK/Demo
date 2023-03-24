import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { Players } from './Players'

const WS = 'ws://127.0.0.1:8080'

@ccclass('Socket')
export class Socket extends Component {

  @property(Players)
  Players

  start() {
    this.establishWS()
  }

  update(deltaTime: number) {

  }

  establishWS() {
    // @ts-expect-error cocos官网示意绑定到wsInstance
    const ws = this.wsInstance = new WebSocket(WS)
    ws.onopen = () => {
      this.Players.generatePlayer()
    }
    ws.onerror = (err) => {
      console.log(err)
    }
    ws.onclose = () => {
      console.log("websocket is closed")
    }
  }

  sendMessage() {
    // this.wsInstance.sendMessage('hello')
  }
}

