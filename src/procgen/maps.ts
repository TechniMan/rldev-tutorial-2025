import { GameMap } from '../engine/GameMap'

// generates a box around the edge of the map
export function Walls(w: number, h: number): GameMap {
  const map = new GameMap(w, h)

  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      if (y === 0 || y === h - 1 || x === 0 || x === w - 1) {
        map.walkable[map.getLength(x, y)] = false
        map.display[map.getLength(x, y)] = '#'
      } else {
        map.walkable[map.getLength(x, y)] = true
        map.display[map.getLength(x, y)] = '.'
      }
    }
  }

  return map
}
