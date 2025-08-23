import type { GameMap } from '../../engine/GameMap'
import type MessageLog from '../../engine/MessageLog'
import type Actor from '../../entities/Actor'
import { BaseAction } from './BaseAction'

export class ReloadAction extends BaseAction {
  perform = (performer: Actor, _gameMap: GameMap, messageLog: MessageLog) => {
    if (!performer.inventory?.attemptToReload()) {
      messageLog.post(`${performer.name} attempted to reload, but couldn't!`)
      return
    }
    // otherwise, we reloaded
    messageLog.post(`${performer.name} reloaded`)
    return
  }
}
