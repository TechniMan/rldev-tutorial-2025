import type { GameMap } from '../../engine/GameMap'
import type MessageLog from '../../engine/MessageLog'
import type Actor from '../../entities/Actor'
import { BaseActionWithDirection } from './BaseActionWithDirection'
import { MeleeAttackAction } from './MeleeAttackAction'
import { MovementAction } from './MovementAction'

export class BumpAction extends BaseActionWithDirection {
  perform = (performer: Actor, gameMap: GameMap, messageLog: MessageLog) => {
    const destX = performer.position.x + this.direction.x
    const destY = performer.position.y + this.direction.y

    if (gameMap.getBlockingEntityAtLocation(destX, destY)) {
      return new MeleeAttackAction(this.direction).perform(performer as Actor, gameMap, messageLog)
    } else {
      return new MovementAction(this.direction).perform(performer, gameMap, messageLog)
    }
  }
}
