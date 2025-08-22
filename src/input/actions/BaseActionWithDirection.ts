import type { GameMap } from '../../engine/GameMap'
import type MessageLog from '../../engine/MessageLog'
import type Actor from '../../entities/Actor'
import type Vector from '../../maths/Vector'
import { BaseAction } from './BaseAction'

export abstract class BaseActionWithDirection extends BaseAction {
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