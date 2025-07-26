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
      } else {
        map.walkable[map.indexOf(x, y)] = true
        map.display[map.indexOf(x, y)] = '.'
      }
    }
  }

  return map
}
