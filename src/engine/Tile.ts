export interface TileGraphic {
  fg: string
  bg: string
}

export class Tile {
  walkable: boolean
  transparent: boolean
  visible: boolean
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
      fg: 'brown',
      bg: 'black'
    },
    {
      fg: 'red',
      bg: 'black'
    }
  )
}

export function wallTile(): Tile {
  return new Tile(
    false,
    false,
    '#',
    {
      fg: 'brown',
      bg: 'black'
    },
    {
      fg: 'red',
      bg: 'black'
    }
  )
}
