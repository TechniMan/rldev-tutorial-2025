import * as ROT from 'rot-js'

export class Engine {
  // constants
  public static readonly MAX_HEIGHT = 11
  public static readonly MAX_WIDTH = 11

  // instance
  display: ROT.Display
  playerPosition

  constructor() {
    // initialisation
    this.playerPosition = { x: 5, y: 5 }
    //TODO input handler

    //TODO renderer
    this.display = new ROT.Display({
      width: Engine.MAX_HEIGHT,
      height: Engine.MAX_WIDTH,
      forceSquareRatio: true
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
    this.update(null)
  }

  update(event: KeyboardEvent | null) {
    if (event) {
      // update player position from movement
      switch (event.key) {
        case '8':
          if (this.playerPosition.y > 0) {
            this.playerPosition.y--
          }
          break
        case '2':
          if (this.playerPosition.y < Engine.MAX_HEIGHT - 1) {
            this.playerPosition.y++
          }
          break
        case '4':
          if (this.playerPosition.x > 0) {
            this.playerPosition.x--
          }
          break
        case '6':
          if (this.playerPosition.x < Engine.MAX_WIDTH - 1) {
            this.playerPosition.x++
          }
          break
      }
    }
    // render player to screen
    this.display.clear()
    this.display.draw(this.playerPosition.x, this.playerPosition.y, '@', 'white', 'black')
  }
}
