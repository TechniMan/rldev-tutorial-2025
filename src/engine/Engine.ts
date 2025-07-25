import * as ROT from 'rot-js'
import { GameMap } from './GameMap'
import { Walls } from '../procgen/maps'
import Rect from '../maths/Rect'
import Vector from '../maths/Vector'

export class Engine {
  // constants
  public static readonly SCREEN_WIDTH = 64
  public static readonly SCREEN_HEIGHT = 48

  // instance
  display: ROT.Display
  playerPosition
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
      forceSquareRatio: true
    })
    const container = this.display.getContainer()!
    document.body.append(container)

    //TODO message log

    // map
    this.map = Walls(
      Engine.SCREEN_WIDTH - 16,
      Engine.SCREEN_HEIGHT
    )
    this.mapRenderRect = new Rect(
      0, 0,
      Engine.SCREEN_WIDTH - 16, Engine.SCREEN_HEIGHT
    )
    this.playerPosition = new Vector(
      this.map.mapWidth / 2,
      this.map.mapHeight / 2
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
      }

      const next = new Vector(
        this.playerPosition.x + movement.x,
        this.playerPosition.y + movement.y
      )
      // is it a valid movement?
      if (this.map.isInMap(next.x, next.y) && this.map.isWalkable(next.x, next.y)) {
        this.playerPosition = next
      } else {
        //TODO optional: log error message for player?
      }
    }

    // clear display
    this.display.clear()
    // render map
    for (let y = 0; y < this.map.mapHeight; ++y) {
      for (let x = 0; x < this.map.mapWidth; ++x) {
        this.display.draw(x, y, this.map.displayChar(x, y), 'white', 'black')
      }
    }
    // TODO render ui area
    for (let y = 0; y < Engine.SCREEN_HEIGHT; ++y) {
      for (let x = this.map.mapWidth; x < Engine.SCREEN_WIDTH; ++x) {
        this.display.draw(x, y, '*', 'black', 'white')
      }
    }
    // render player to screen
    this.display.draw(this.playerPosition.x, this.playerPosition.y, '@', 'white', 'black')
  }
}
