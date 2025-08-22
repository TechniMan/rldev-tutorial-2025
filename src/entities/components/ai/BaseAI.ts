import { Path } from 'rot-js'
import type { GameMap } from '../../../engine/GameMap'
import type MessageLog from '../../../engine/MessageLog'
import { type Action } from '../../../input/Action'
import Vector from '../../../maths/Vector'
import type Actor from '../../Actor'

export abstract class BaseAI implements Action {
  path: Vector[]

  protected constructor() {
    this.path = []
  }

  abstract perform(
    _performer: Actor,
    _gameMap: GameMap,
    _messageLog: MessageLog
  ): void

  /**
   * Calculate the path from the entity's current position to the destination point
   * @param destination location to head toward
   * @param actor actor to find path from
   * @param gameMap the map
   */
  calculatePathTo(
    destination: Vector,
    entity: Actor,
    gameMap: GameMap
  ): void {
    // set-up a pathfinder to the destination location
    const isWalkable = (x: number, y: number) => gameMap.tiles[gameMap.indexOf(x, y)].walkable
    const dijkstra = new Path.Dijkstra(
      destination.x,
      destination.y,
      isWalkable,
      { topology: 8 }
    )

    // clear the current path
    this.path.clear()

    // compute path from entity's position
    dijkstra.compute(
      entity.position.x,
      entity.position.y,
      (x: number, y: number) => {
        this.path.push(new Vector(x, y))
      }
    )

    // the first point in the path is the entity's current position,
    //  so discard it else they'll never move
    this.path.shift()
  }
}
