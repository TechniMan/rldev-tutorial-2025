import { Display, FOV } from 'rot-js'
import type Actor from '../entities/Actor'
import type Entity from '../entities/Entity'
import { floorTile, type Tile } from './Tile'
import Vector from '../maths/Vector'
import { Engine } from './Engine'
import * as Colours from '../maths/Colours'
import type Rect from '../maths/Rect'

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
    return this.tiles[this.indexOf(x, y)].walkable &&
      this.getBlockingEntityAtLocation(x, y) === undefined
  }

  isVisible(x: number, y: number): boolean {
    return this.tiles[this.indexOf(x, y)].visible
  }

  getBlockingEntityAtLocation(x: number, y: number): Entity | undefined {
    return this.entities.find((e) => e.blocksMovement && e.position.x === x && e.position.y === y)
  }

  charToDisplayAt(x: number, y: number): string {
    // get just the first character
    return this.tiles[this.indexOf(x, y)].char
  }

  // Does the light pass through x,y?
  lightPasses(x: number, y: number): boolean {
    // fov might give coords outside of map, so guard against it
    return this.isInMap(x, y) && this.isWalkable(x, y)
    // this.tiles[this.indexOf(x, y)].transparent
  }

  updateFov() {
    // reset visibility of tiles
    for (let i = 0; i < this.mapLength; ++i) {
      this.tiles[i].visible = false
    }

    // determine currently visible tiles
    const fov = new FOV.RecursiveShadowcasting(this.lightPasses.bind(this), {
      topology: 8
    })
    fov.compute(
      // centre around player
      this.player.position.x, this.player.position.y,
      // fov range of 16
      16,
      // r is radius from player, v is visibility in range [0, 1]
      (x, y, _r, v) => {
        // if visible, mark as so
        if (v) {
          this.tiles[this.indexOf(x, y)].visible = true
          this.tiles[this.indexOf(x, y)].seen = true
          this.tiles[this.indexOf(x, y)].visibility = v // r / 16.0
        }
      })
  }

  // draws the map to the given display area
  draw(display: Display, renderRect: Rect): void {
    // offset world drawing by the player's position
    // i.e. like a camera is following them
    const playerMapPosition = this.player.position
    const renderOffset = new Vector().minus(playerMapPosition).plus(Engine.playerScreenPosition)

    // render map
    for (let y = renderRect.top; y < renderRect.bottom; ++y) {
      for (let x = renderRect.left; x < renderRect.right; ++x) {
        if (!this.isInMap(x - renderOffset.x, y - renderOffset.y)) {
          continue
        }

        const tile = this.tiles[this.indexOf(x - renderOffset.x, y - renderOffset.y)]
        // if currently visible, is lit
        const graphic = tile.visible ? tile.lit :
          // if seen previously, is unlit
          tile.seen ? tile.unlit :
            // else, is invisible
            { fg: Colours.blank(), bg: Colours.blank() }
        display.draw(
          x,
          y,
          tile.char,
          graphic.fg.asHex,
          graphic.bg.asHex
        )
      }
    }

    // render entities
    for (let e of this.entities) {
      if (this.isVisible(e.position.x, e.position.y)) {
        display.draw(
          e.position.x + renderOffset.x,
          e.position.y + renderOffset.y,
          e.char,
          e.fg,
          e.bg
        )
      }
    }
  }
}
