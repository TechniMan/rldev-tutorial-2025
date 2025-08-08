import type { Display } from 'rot-js'
import { BaseScreen } from './BaseScreen'
import type { GameMap } from '../engine/GameMap'
import { RockyDesert } from '../procgen/maps'
import Vector from '../maths/Vector'
import { BumpAction } from '../input/Action'
import * as Colours from '../maths/Colours'
import Rect from '../maths/Rect'
import { Engine } from '../engine/Engine'

export class GameScreen extends BaseScreen {
  gameMap: GameMap
  // render areas
  mapRenderRect: Rect
  uiRenderRect: Rect

  constructor(
    display: Display,
    // serialisedGameMap: string | null = null
  ) {
    //TODO load from the serialisedGameMap
    //TODO else generateFloor:
    const map = RockyDesert(64, 64)
    super(display, map.player)
    this.gameMap = map

    //TODO init inputhandler

    // let's get ready to rendeeeer!
    this.mapRenderRect = new Rect(
      0, 0,
      Engine.SCREEN_WIDTH - 16, Engine.SCREEN_HEIGHT
    )
    this.uiRenderRect = new Rect(
      this.mapRenderRect.right, 0,
      16, Engine.SCREEN_HEIGHT
    )
    this.render()
  }

  update(event: KeyboardEvent): BaseScreen {
    //TODO use inputHandler to determine appropriate action
    // update player position from movement
    let movement = { x: 0, y: 0 }
    switch (event.key) {
      case '8':
        movement.y = -1
        break
      case '2':
        movement.y = 1
        break
      case '4':
        movement.x = -1
        break
      case '6':
        movement.x = 1
        break
      case '7':
        movement.x = -1
        movement.y = -1
        break
      case '9':
        movement.x = 1
        movement.y = -1
        break
      case '3':
        movement.x = 1
        movement.y = 1
        break
      case '1':
        movement.x = -1
        movement.y = 1
        break
    }

    // create the relevant action
    if (movement.x || movement.y) {
      const action = new BumpAction(new Vector(
        movement.x,
        movement.y
      ))
      // have the player perform it
      action.perform(this.player, this.gameMap)

      // update fov in map
      this.gameMap.updateFov()
    }

    // update the screen
    this.render()

    return this
  }

  render(): void {
    // clear display
    this.display.clear()

    // draw map (first so UI etc goes on top)
    this.gameMap.draw(this.display, this.mapRenderRect)

    // render ui area (placeholder for now)
    for (let y = 0; y < this.uiRenderRect.bottom; ++y) {
      for (let x = this.uiRenderRect.left; x < this.uiRenderRect.right; ++x) {
        this.display.draw(
          x,
          y,
          '-',
          Colours.uiFg().asHex,
          Colours.uiBg().asHex
        )
      }
    }
    this.display.drawText(
      this.uiRenderRect.left + 1,
      this.uiRenderRect.top + 1,
      'Player'
    )
  }
}
