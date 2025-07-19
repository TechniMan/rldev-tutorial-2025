export class GameMap {
  mapWidth: number
  mapHeight: number
  _mapLength: number

  walkable: boolean[]
  //TODO transparent array
  display: string[]

  constructor(w: number, h: number) {
    this.mapWidth = w
    this.mapHeight = h
    this._mapLength = w * h

    this.walkable = new Array(this._mapLength)
    this.display = new Array(this._mapLength)
  }

  getLength(x: number, y: number): number {
    return x + y * this.mapWidth
  }

  isInMap(x: number, y: number): boolean {
    return 0 <= x && x < this.mapWidth && 0 <= y && y < this.mapHeight
  }

  isWalkable(x: number, y: number): boolean {
    return this.walkable[this.getLength(x, y)]
  }

  displayChar(x: number, y: number): string {
    // get just the first character
    return this.display[this.getLength(x, y)][0]
  }
}
