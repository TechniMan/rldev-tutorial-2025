import { Path } from 'rot-js'
import type { GameMap } from '../../engine/GameMap'
import type MessageLog from '../../engine/MessageLog'
import { MeleeAttackAction, MovementAction, WaitAction, type Action } from '../../input/Action'
import Vector from '../../maths/Vector'
import type Actor from '../Actor'

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

export class HostileEnemy extends BaseAI {
  constructor() {
    super()
  }

  perform(
    self: Actor,
    gameMap: GameMap,
    _messageLog: MessageLog
  ) {
    // find target
    const target = gameMap.player
    // are we visible to the player?
    if (gameMap.isVisible(self.position.x, self.position.y)) {
      // are we in range to attack?
      const dx = target.position.x - self.position.x
      const dy = target.position.y - self.position.y
      const distance = Math.max(Math.abs(dx), Math.abs(dy))
      if (distance <= 1) {
        return new MeleeAttackAction(
          new Vector(dx, dy)
        ).perform(self, gameMap, _messageLog)
      }

      // else, find a path to them
      this.calculatePathTo(target.position, self, gameMap)
    }

    // if there is a valid path, attempt to move along it
    // because the path isn't cleared when we can't see them,
    //  we will continue moving to their last known location
    if (this.path.length > 0) {
      const destination = this.path.shift()!
      return new MovementAction(
        destination.minus(self.position)
      ).perform(self, gameMap, _messageLog)
    }

    // finally, if player location is unknown and we have nowhere to go,
    //  just hang and chill
    return new WaitAction(
    ).perform(self, gameMap, _messageLog)
  }
}
