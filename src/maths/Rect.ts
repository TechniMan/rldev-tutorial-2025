import Vector from './Vector'

export default class Rect {
  _x: number
  _y: number
  _w: number
  _h: number

  constructor(x: number, y: number, w: number, h: number) {
    this._x = x
    this._y = y
    this._w = w
    this._h = h
  }

  public get position(): Vector {
    return new Vector(this._x, this._y)
  }
  public get size(): Vector {
    return new Vector(this._w, this._h)
  }

  public get top(): number {
    return this._y
  }
  public get right(): number {
    return this._x + this._w
  }
  public get bottom(): number {
    return this._y + this._h
  }
  public get left(): number {
    return this._x
  }
}
