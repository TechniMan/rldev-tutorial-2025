import { Engine } from '../engine/Engine'
import type Vector from '../maths/Vector'
import Actor from './Actor'

export function spawnPlayer(
  position: Vector
): Actor {
  return new Actor(
    position,
    '@',
    Engine.lightBlue,
    Engine.darkBlue,
    'Player'
  )
}
