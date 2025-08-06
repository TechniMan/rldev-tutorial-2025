import type Vector from '../maths/Vector'
import Actor from './Actor'
import * as Colours from '../maths/Colours'

export function spawnPlayer(
  position: Vector
): Actor {
  return new Actor(
    position,
    '@',
    Colours.entityFg().asHex,
    Colours.planetBrightBg().asHex,
    'Player',
    [30, 2, 5]
  )
}

export function spawnBugling(
  position: Vector
): Actor {
  return new Actor(
    position,
    'b',
    Colours.entityFg().asHex,
    Colours.planetBrightBg().asHex,
    'Bugling',
    [10, 0, 3]
  )
}

export function spawnBug(
  position: Vector
): Actor {
  return new Actor(
    position,
    'B',
    Colours.entityFg().asHex,
    Colours.planetBrightBg().asHex,
    'Bug',
    [16, 1, 4]
  )
}
