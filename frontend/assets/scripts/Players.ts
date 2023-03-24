import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Players')
export class Players extends Component {

    @property(Prefab)
    player

    start() {

    }

    update(deltaTime: number) {

    }

    generatePlayer() {
        this.player.createNode((err, node) => {
            node.setParent(this.node)
            node.setPosition(0, 0)
        })
    }
}

