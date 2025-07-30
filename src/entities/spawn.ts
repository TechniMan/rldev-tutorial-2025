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
    'Player'
  )
}
