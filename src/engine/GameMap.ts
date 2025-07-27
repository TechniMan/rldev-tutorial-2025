import type Actor from '../entities/Actor'
import type Entity from '../entities/Entity'
import Vector from '../maths/Vector'
import { floorTile, type Tile } from './Tile'

export class GameMap {
  private _mapWidth: number
  private _mapHeight: number
  private mapLength: number

  private _player: Actor
  private _entities: Entity[]

  tiles: Tile[]

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

    this.tiles = new Array(this.mapLength)

    for (let idx = 0; idx < this.mapLength; ++idx) {
      this.tiles[idx] = floorTile()
    }
  }

  indexOf(x: number, y: number): number {
    return x + y * this.mapWidth
  }

  isInMap(x: number, y: number): boolean {
    return 0 <= x && x < this.mapWidth && 0 <= y && y < this.mapHeight
  }

  isWalkable(x: number, y: number): boolean {
    return this.tiles[this.indexOf(x, y)].walkable ||
      this._entities.any(e => e.blocksMovement && e.position.matches(new Vector(x, y)))
  }

  charToDisplayAt(x: number, y: number): string {
    // get just the first character
    return this.tiles[this.indexOf(x, y)].char
  }

  //TODO draws the map to the given display area
  // draw(): void {
  // }
}
