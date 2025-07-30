import { RNG } from 'rot-js'
import { GameMap } from '../engine/GameMap'
import { spawnBug, spawnBugling, spawnPlayer } from '../entities/spawn'
import Vector from '../maths/Vector'
import { wallTile } from '../engine/Tile'

// generates a box around the edge of the map
export function Walls(w: number, h: number): GameMap {
  const map = new GameMap(w, h, spawnPlayer(
    new Vector(w / 2, h / 2)
  ))

  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      if (y === 0 || y === h - 1 || x === 0 || x === w - 1) {
        map.tiles[map.indexOf(x, y)] = wallTile()
      }
    }
  }

  return map
}

export function RockyDesert(w: number, h: number): GameMap {
  // default map with edges and player in centre
  const map = Walls(w, h)

  // initiate some random rocks in the landscape
  for (let attempt = 0; attempt < 50; ++attempt) {
    const rockPos = new Vector(
      RNG.getUniformInt(1, w - 2),
      RNG.getUniformInt(1, h - 2)
    )
    if (map.isWalkable(rockPos.x, rockPos.y)) {
      map.tiles[map.indexOf(rockPos.x, rockPos.y)] = wallTile()
    }
  }

  // sprinkle in some basic enemies
  for (let attempt = 0; attempt < 20; ++attempt) {
    const bugPos = new Vector(
      RNG.getUniformInt(1, w - 2),
      RNG.getUniformInt(1, h - 2)
    )
    if (map.isWalkable(bugPos.x, bugPos.y)) {
      // avg 4 buglings : 1 bug
      if (RNG.getUniform() < 0.8) {
        map.entities.push(spawnBugling(bugPos))
      } else {
        map.entities.push(spawnBug(bugPos))
      }
    }
  }

  return map
}

export function TiledPlanet(): GameMap {
  // make a large space to play in
  const map = Walls(1024, 1024)

  //TODO randomly determine nature of large tiles of the map, e.g. 32*32 each
  //TODO generate each tile based on its type, filling in the map as we go
  //TODO e.g. empty, sparse rocks, walled structure, etc

  return map
}
