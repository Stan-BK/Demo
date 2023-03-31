import { _decorator, Component, Node, Input, input, Tween, CCInteger, Vec2, find, Script, CCBoolean } from 'cc';
const { ccclass, property } = _decorator;
import globalInstance from './Global';

@ccclass('Player')
export class Player extends Component {

    @property(CCInteger)
    rate = 2

    @property(Vec2)
    pos

    @property
    dir = {
        x: 0,
        y: 0
    }

    @property(CCBoolean)
    isMove = false

    @property
    socket

    start() {
        this.pos = this.node.getPosition()
        this.socket = globalInstance.socket

        input.on(Input.EventType.KEY_DOWN, (e) => {
            this.isMove = true
            switch (e.keyCode) {
                case 87: {
                    this.dir.y = this.rate
                } break
                case 68: {
                    this.dir.x = this.rate
                } break
                case 83: {
                    this.dir.y = -this.rate
                } break
                case 65: {
                    this.dir.x = -this.rate
                } break
            }
        })

        input.on(Input.EventType.KEY_UP, (e) => {
            switch (e.keyCode) {
                case 87: {
                    this.dir.y = this.dir.y > 0 ? 0 : this.dir.y
                } break
                case 68: {
                    this.dir.x = this.dir.x > 0 ? 0 : this.dir.x
                } break
                case 83: {
                    this.dir.y = this.dir.y < 0 ? 0 : this.dir.y
                } break
                case 65: {
                    this.dir.x = this.dir.x < 0 ? 0 : this.dir.x
                } break
            }
        })
    }

    update(deltaTime: number) {
        const tween = new Tween(this.node)


        this.pos.x += this.dir.x
        this.pos.y += this.dir.y
        this.node.setPosition(this.pos)
        if (this.dir.x || this.dir.y) {
            this.socket.send(JSON.stringify(this.pos))
        }
        // tween.to(.1, {
        //     position: this.pos
        // })
    }
}

