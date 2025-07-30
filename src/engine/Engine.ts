import * as ROT from 'rot-js'
import { GameMap } from './GameMap'
import { RockyDesert } from '../procgen/maps'
import Rect from '../maths/Rect'
import Vector from '../maths/Vector'
import * as Colours from '../maths/Colours'
import { BumpAction } from '../input/Action'

export class Engine {
  // constants
  public static readonly SCREEN_WIDTH = 64
  public static readonly SCREEN_HEIGHT = 48
  public static readonly SCREEN_HEIGHT_HALF = 24
  public static readonly playerScreenPosition = new Vector(Engine.SCREEN_HEIGHT_HALF, Engine.SCREEN_HEIGHT_HALF)

  public static lightBlue = 'lightblue'
  public static darkBlue = 'blue'

  // instance
  display: ROT.Display
  map: GameMap

  // render areas
  mapRenderRect: Rect
  uiRenderRect: Rect

  constructor() {
    //TODO input handler

    // renderer
    this.display = new ROT.Display({
      width: Engine.SCREEN_WIDTH,
      height: Engine.SCREEN_HEIGHT,
      forceSquareRatio: true,
      bg: Colours.uiBg().asHex,
      fg: Colours.uiFg().asHex
    })
    const container = this.display.getContainer()!
    document.body.append(container)

    //TODO message log

    // map
    this.map = RockyDesert(64, 64)
    this.mapRenderRect = new Rect(
      0, 0,
      Engine.SCREEN_WIDTH - 16, Engine.SCREEN_HEIGHT
    )

    this.uiRenderRect = new Rect(
      this.mapRenderRect.right, 0,
      16, Engine.SCREEN_HEIGHT
    )

    // add keydown listener
    window.addEventListener('keydown', (ev) => {
      this.update(ev)
    })
    //TODO add mousemove listener

    // trigger initial render
    this.update(null)
  }

  update(event: KeyboardEvent | null) {
    if (event) {
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
      const action = new BumpAction(new Vector(
        movement.x,
        movement.y
      ))
      // have the player perform it
      action.perform(this.map.player, this.map)
    }
    this.map.updateFov()

    // clear display
    this.display.clear()

    // draw map (first so UI etc goes on top)
    this.map.draw(this.display, this.mapRenderRect)

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
