import type { GameMap } from '../../engine/GameMap'
import type MessageLog from '../../engine/MessageLog'
import type Actor from '../../entities/Actor'

export abstract class BaseAction {
  perform: (
    performer: Actor,
    gameMap: GameMap,
    messageLog: MessageLog
  ) => void = function () { }
}
