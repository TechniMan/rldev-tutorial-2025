import type { GameMap } from '../engine/GameMap'
import type MessageLog from '../engine/MessageLog'
import type Actor from '../entities/Actor'
import Vector from '../maths/Vector'

export abstract class Action {
  perform: (
    performer: Actor,
    gameMap: GameMap,
    messageLog: MessageLog
  ) => void = function () { }
}

// Wait a turn. Do nothing.
export class WaitAction extends Action {
  perform = (
    _performer: Actor,
    _gameMap: GameMap,
    _messageLog: MessageLog
  ) => { }
}

export abstract class ActionWithDirection extends Action {
  private _direction: Vector

  public get direction(): Vector {
    return this._direction
  }

  constructor(
    direction: Vector
  ) {
    super()

    this._direction = direction
  }

  perform = (
    _performer: Actor,
    _gameMap: GameMap,
    _messageLog: MessageLog
  ) => { }
}

export class MovementAction extends ActionWithDirection {
  perform = (performer: Actor, gameMap: GameMap, _: MessageLog) => {
    const destX = performer.position.x + this.direction.x
    const destY = performer.position.y + this.direction.y

    if (gameMap.isWalkable(destX, destY)) {
      performer.move(this.direction)
    }
  }
}

export class MeleeAttackAction extends ActionWithDirection {
  perform = (performer: Actor, gameMap: GameMap, messageLog: MessageLog) => {
    const destX = performer.position.x + this.direction.x
    const destY = performer.position.y + this.direction.y
    const target = gameMap.getBlockingEntityAtLocation(destX, destY) as Actor

    const alive = target.fighter.damage(performer.fighter.power)
    const extra = alive ? '' : ' They died!'
    messageLog.post(`${performer.name} attacked ${target.name} with ${performer.fighter.power} power!${extra}`)
  }
}

export class BumpAction extends ActionWithDirection {
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
