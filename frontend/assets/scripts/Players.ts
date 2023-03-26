import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
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
        const node = instantiate(this.player)
        node.setParent(this.node)
        node.setPosition(0, 0)
    }
}

