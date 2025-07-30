import type Vector from '../maths/Vector'
import Actor from './Actor'
import * as Colours from '../maths/colours'

export function spawnPlayer(
  position: Vector
): Actor {
  return new Actor(
    position,
    '@',
    Colours.entityFg().asHex,
    Colours.planetBrightBg().asHex,
    'Player'
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
    'Bugling'
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
    'Bug'
  )
}
