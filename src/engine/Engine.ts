import * as ROT from 'rot-js'
import Vector from '../maths/Vector'
import * as Colours from '../maths/Colours'
import type { BaseScreen } from '../screens/BaseScreen'
import { GameScreen } from '../screens/GameScreen'
import MouseButton from '../input/MouseButton'

export class Engine {
  // constants
  public static readonly SCREEN_WIDTH = 64
  public static readonly SCREEN_HEIGHT = 64
  public static readonly MAP_HEIGHT = 48
  public static readonly MAP_HEIGHT_HALF = 24
  public static readonly playerScreenPosition = new Vector(Engine.MAP_HEIGHT_HALF, Engine.MAP_HEIGHT_HALF)

  // instance
  display: ROT.Display

  screen: BaseScreen

  constructor() {
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

    // trigger initial render
    this.screen = new GameScreen(this.display)

    // add keydown listener
    window.addEventListener('keydown', (ev) => {
      this.screen = this.screen.update(ev)
    })
    // add mousemove listener
    window.addEventListener('mousemove', (ev) => {
      this.screen.onMouseMove(Vector.fromArray(this.display.eventToPosition(ev)))
      this.screen.render()
    })
    window.addEventListener('mousedown', (ev) => {
      this.screen.onMouseClick(ev.button as MouseButton)
      this.screen.render()
    })
  }
}
