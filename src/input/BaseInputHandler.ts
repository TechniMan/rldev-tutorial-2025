import type { Display } from 'rot-js'
import Vector from '../maths/Vector'
import { BumpAction, RangedAttackAction, WaitAction, type BaseAction } from './actions'
import type Actor from '../entities/Actor'
import { ReloadAction } from './actions/ReloadAction'
import MouseButton from './MouseButton'
import type { GameMap } from '../engine/GameMap'

interface DirectionMap {
  [key: string]: Vector
}

const MOVE_KEYS: DirectionMap = {
  // numpad
  '1': new Vector(-1, 1),
  '2': new Vector(0, 1),
  '3': new Vector(1, 1),
  '4': new Vector(-1, 0),
  '6': new Vector(1, 0),
  '7': new Vector(-1, -1),
  '8': new Vector(0, -1),
  '9': new Vector(1, -1),
}

export abstract class BaseInputHandler {
  nextHandler: BaseInputHandler
  mousePosition: Vector
  mousePositionOnMap: Vector

  protected constructor() {
    this.nextHandler = this
    this.mousePosition = new Vector()
    this.mousePositionOnMap = new Vector()
  }

  abstract onKeyPress(
    event: KeyboardEvent,
    player: Actor
  ): BaseAction | null

  onMouseMove(
    screenPosition: Vector,
    mapPosition: Vector
  ): void {
    this.mousePosition = screenPosition
    this.mousePositionOnMap = mapPosition
  }

  abstract onMouseClick(
    button: MouseButton,
    player: Actor,
    gameMap: GameMap
  ): BaseAction | null

  onRender(
    _display: Display
  ): void {
  }
}

export class GameInputHandler extends BaseInputHandler {
  constructor() {
    super()
  }

  onKeyPress(event: KeyboardEvent, player: Actor): BaseAction | null {
    // if not alive, don't respond to key press
    if (!player.isAlive) {
      return null
    }

    // moving
    if (event.key in MOVE_KEYS) {
      return new BumpAction(MOVE_KEYS[event.key])
    }

    // other actions
    switch (event.key) {
      case '5':
        return new WaitAction()

      case 'r':
        return new ReloadAction()
    }

    // no valid action found for key press
    return null
  }

  onMouseClick(button: MouseButton, player: Actor, gameMap: GameMap): BaseAction | null {
    const entityAtLocation = gameMap.getBlockingEntityAtLocation(
      this.mousePositionOnMap.x,
      this.mousePositionOnMap.y
    )

    // if we're hovering on an enemy and click with our primary mouse button
    if (entityAtLocation && button === MouseButton.Main) {
      // fire!
      return new RangedAttackAction(
        entityAtLocation.position.minus(player.position)
      )
    }

    // else, no valid action to take here
    return null
  }
}
