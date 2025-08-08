import * as ROT from 'rot-js'
import Vector from '../maths/Vector'
import * as Colours from '../maths/Colours'
import type { BaseScreen } from '../screens/BaseScreen'
import { GameScreen } from '../screens/GameScreen'

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

  screen: BaseScreen

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

    // add keydown listener
    window.addEventListener('keydown', (ev) => {
      this.update(ev)
    })
    //TODO add mousemove listener

    // trigger initial render
    this.screen = new GameScreen(this.display)
  }

  update(event: KeyboardEvent) {
    this.screen = this.screen.update(event)
    this.screen.render()
  }
}
