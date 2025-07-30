import type { GameMap } from '../engine/GameMap'
import type Entity from '../entities/Entity'
import Vector from '../maths/Vector'

export abstract class Action {
  perform: (performer: Entity, gameMap: GameMap) => void = function () { }
}

// Wait a turn. Do nothing.
export class WaitAction extends Action {
  perform = (_performer: Entity, _gameMap: GameMap) => { }
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

  perform = (_performer: Entity, _gameMap: GameMap) => { }
}

export class MovementAction extends ActionWithDirection {
  perform = (performer: Entity, gameMap: GameMap) => {
    const destX = performer.position.x + this.direction.x
    const destY = performer.position.y + this.direction.y

    if (gameMap.isWalkable(destX, destY)) {
      performer.move(this.direction)
    }
  }
}
