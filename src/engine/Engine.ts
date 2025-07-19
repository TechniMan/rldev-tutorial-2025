import * as ROT from 'rot-js'
import { GameMap } from './GameMap'
import { Walls } from '../procgen/maps'

export class Engine {
  // constants
  public static readonly MAX_HEIGHT = 11
  public static readonly MAX_WIDTH = 11

  // instance
  display: ROT.Display
  playerPosition
  map: GameMap

  constructor() {
    // initialisation
    this.playerPosition = { x: 5, y: 5 }
    //TODO input handler

    // renderer
    this.display = new ROT.Display({
      width: Engine.MAX_HEIGHT,
      height: Engine.MAX_WIDTH,
      forceSquareRatio: true
    })
    const container = this.display.getContainer()!
    document.body.append(container)

    //TODO message log

    // map
    this.map = Walls(Engine.MAX_WIDTH, Engine.MAX_HEIGHT)

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
          if (this.playerPosition.y > 0) {
            movement.y = -1
          }
          break
        case '2':
          if (this.playerPosition.y < Engine.MAX_HEIGHT - 1) {
            movement.y = 1
          }
          break
        case '4':
          if (this.playerPosition.x > 0) {
            movement.x = -1
          }
          break
        case '6':
          if (this.playerPosition.x < Engine.MAX_WIDTH - 1) {
            movement.x = 1
          }
          break
      }
      if (this.map.isWalkable(this.playerPosition.x + movement.x, this.playerPosition.y + movement.y)) {
        this.playerPosition.x += movement.x
        this.playerPosition.y += movement.y
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
    // render player to screen
    this.display.draw(this.playerPosition.x, this.playerPosition.y, '@', 'white', 'black')
  }
}
