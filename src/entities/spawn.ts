import type Vector from '../maths/Vector'
import Actor from './Actor'
import * as Colours from '../maths/Colours'
import { HostileEnemy } from './components/ai/HostileEnemy'
import { Inventory } from './components'

export function spawnPlayer(
  position: Vector
): Actor {
  return new Actor(
    position,
    '@',
    Colours.entityFg().asHex,
    Colours.planetBrightBg().asHex,
    'Player',
    null,
    [30, 2, 5],
    new Inventory(
      24, 3, 5
    )
  )
}

export function spawnBugling(
  position: Vector,
  player: Actor
): Actor {
  return new Actor(
    position,
    'b',
    Colours.entityFg().asHex,
    Colours.planetBrightBg().asHex,
    'Bugling',
    new HostileEnemy(player),
    [10, 0, 3],
    null
  )
}

export function spawnBug(
  position: Vector,
  player: Actor
): Actor {
  return new Actor(
    position,
    'B',
    Colours.entityFg().asHex,
    Colours.planetBrightBg().asHex,
    'Bug',
    new HostileEnemy(player),
    [16, 1, 4],
    null
  )
}
