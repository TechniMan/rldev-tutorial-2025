import type { GameMap } from '../../engine/GameMap'
import type MessageLog from '../../engine/MessageLog'
import type Actor from '../../entities/Actor'
import { BaseActionWithDirection } from './BaseActionWithDirection'

export class RangedAttackAction extends BaseActionWithDirection {
  perform = (performer: Actor, gameMap: GameMap, messageLog: MessageLog) => {
    // can we fire?
    if (!performer.inventory?.attemptToFire()) {
      messageLog.post(`${performer.name} attempted to fire their weapon, but couldn't!`)
      return
    }

    const destX = performer.position.x + this.direction.x
    const destY = performer.position.y + this.direction.y
    const target = gameMap.getBlockingEntityAtLocation(destX, destY) as Actor

    const alive = target.fighter.damage(performer.fighter.power)
    const extra = alive ? '' : ' and they died!'
    messageLog.post(`${performer.name} shot ${target.name}${extra}`)
    // kill the actor after the message, else it will say we 'attacked remains of bug'
    if (!alive) {
      target.die()
    }
  }
}
