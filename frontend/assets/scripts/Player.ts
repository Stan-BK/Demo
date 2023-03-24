import { _decorator, Component, Node, Input, input, Tween, CCInteger, Vec2, find } from 'cc';
const { ccclass, property } = _decorator;

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

    @property(Node)
    socket

    start() {
        this.pos = this.node.getPosition()
        this.socket = find('Canvas')

        console.log(this.socket)

        input.on(Input.EventType.KEY_DOWN, (e) => {
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
    }

    update(deltaTime: number) {
        const tween = new Tween(this.node)


        this.pos.x += this.dir.x
        this.pos.y += this.dir.y
        this.node.setPosition(this.pos)
        // tween.to(.1, {
        //     position: this.pos
        // })
    }
}

