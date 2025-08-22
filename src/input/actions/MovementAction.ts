import type { GameMap } from '../../engine/GameMap'
import type MessageLog from '../../engine/MessageLog'
import type Actor from '../../entities/Actor'
import { BaseActionWithDirection } from './BaseActionWithDirection'

export class MovementAction extends BaseActionWithDirection {
  perform = (performer: Actor, gameMap: GameMap, _: MessageLog) => {
    const destX = performer.position.x + this.direction.x
    const destY = performer.position.y + this.direction.y

    if (gameMap.isWalkable(destX, destY)) {
      performer.move(this.direction)
    }
  }
}