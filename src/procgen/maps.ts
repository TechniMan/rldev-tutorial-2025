import { RNG } from 'rot-js'
import { GameMap } from '../engine/GameMap'
import { spawnPlayer } from '../entities/spawn'
import Vector from '../maths/Vector'

// generates a box around the edge of the map
export function Walls(w: number, h: number): GameMap {
  const map = new GameMap(w, h, spawnPlayer(
    new Vector(w / 2, h / 2)
  ))

  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      if (y === 0 || y === h - 1 || x === 0 || x === w - 1) {
        map.walkable[map.indexOf(x, y)] = false
        map.display[map.indexOf(x, y)] = '#'
      }
    }
  }

  return map
}

export function RockyDesert(w: number, h: number): GameMap {
  // we'll find a spot for the player soon
  const map = Walls(w, h)

  // initiate some random rocks in the landscape
  for (let attempt = 0; attempt < 50; ++attempt) {
    const rockPos = new Vector(
      RNG.getUniformInt(1, w - 2),
      RNG.getUniformInt(1, h - 2)
    )
    if (map.isWalkable(rockPos.x, rockPos.y)) {
      map.walkable[map.indexOf(rockPos.x, rockPos.y)] = false
      map.display[map.indexOf(rockPos.x, rockPos.y)] = '#'
    }
  }

  return map
}
