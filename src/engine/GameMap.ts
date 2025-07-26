import type Actor from '../entities/Actor'
import type Entity from '../entities/Entity'

export class GameMap {
  private _mapWidth: number
  private _mapHeight: number
  private mapLength: number

  private _player: Actor
  private _entities: Entity[]

  walkable: boolean[]
  //TODO transparent array
  display: string[]

  public get mapWidth(): number {
    return this._mapWidth
  }
  public get mapHeight(): number {
    return this._mapHeight
  }
  public get player(): Actor {
    return this._player
  }
  public get entities(): Entity[] {
    return this._entities
  }

  constructor(w: number, h: number, p: Actor) {
    this._mapWidth = w
    this._mapHeight = h
    this.mapLength = w * h
    this._entities = [p]
    this._player = p

    this.walkable = new Array(this.mapLength)
    this.display = new Array(this.mapLength)
  }

  indexOf(x: number, y: number): number {
    return x + y * this.mapWidth
  }

  isInMap(x: number, y: number): boolean {
    return 0 <= x && x < this.mapWidth && 0 <= y && y < this.mapHeight
  }

  isWalkable(x: number, y: number): boolean {
    return this.walkable[this.indexOf(x, y)]
  }

  charToDisplayAt(x: number, y: number): string {
    // get just the first character
    return this.display[this.indexOf(x, y)][0]
  }
}
