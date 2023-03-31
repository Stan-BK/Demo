import { _decorator, Component, Node, Prefab, instantiate, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Players')
export class Players extends Component {

    @property(Prefab)
    player

    @property(Prefab)
    enemy

    @property
    enemies = []

    start() {

    }

    update(deltaTime: number) {

    }

    generatePlayer() {
        const node = instantiate(this.player)
        node.setParent(this.node)
        node.setPosition(0, 0)
    }

    generateEnemy(id: number, pos: string) {
        const node = instantiate(this.enemy)
        node.setParent(this.node)
        node.setPosition(new Vec3(JSON.parse(pos)))
        this.enemies.push({
            id,
            node
        })
    }

    moveEnemy(id: number, pos: string) {
        const e = this.enemies
        for (let i = 0; i < e.length; i++) {
            if (e[i].id === id) {
                e[i].node.setPosition(new Vec3(JSON.parse(pos)))
                break
            }
        }
    }
}

