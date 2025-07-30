import type Colour from '../maths/Colour'
import * as Colours from '../maths/colours'

export interface TileGraphic {
  fg: Colour
  bg: Colour
}

export class Tile {
  walkable: boolean
  transparent: boolean
  visible: boolean
  visibility: number
  seen: boolean
  char: string
  unlit: TileGraphic
  lit: TileGraphic

  constructor(
    walkable: boolean,
    transparent: boolean,
    char: string,
    unlit: TileGraphic,
    lit: TileGraphic
  ) {
    this.walkable = walkable
    this.transparent = transparent
    this.visible = false
    this.visibility = 0
    this.seen = false
    this.char = char
    this.unlit = unlit
    this.lit = lit
  }
}

export function floorTile(): Tile {
  return new Tile(
    true,
    true,
    '.',
    {
      bg: Colours.planetDarkBg(),
      fg: Colours.planetDarkFg()
    },
    {
      bg: Colours.planetBrightBg(),
      fg: Colours.planetBrightFg()
    }
  )
}

export function wallTile(): Tile {
  return new Tile(
    false,
    false,
    '#',
    {
      bg: Colours.planetDarkBg(),
      fg: Colours.planetDarkFg()
    },
    {
      bg: Colours.planetBrightBg(),
      fg: Colours.planetBrightFg()
    }
  )
}
