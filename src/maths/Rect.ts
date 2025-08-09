import Vector from './Vector'

export default class Rect {
  private _x: number
  private _y: number
  private _w: number
  private _h: number

  private get x(): number {
    return this._x
  }
  private get y(): number {
    return this._y
  }
  private get w(): number {
    return this._w
  }
  private get h(): number {
    return this._h
  }


  constructor(x: number, y: number, w: number, h: number) {
    this._x = x
    this._y = y
    this._w = w
    this._h = h
  }

  public get centre(): Vector {
    return new Vector(
      this.w / 2,
      this.h / 2
    )
  }

  public get position(): Vector {
    return new Vector(this.x, this.y)
  }
  public get size(): Vector {
    return new Vector(this.w, this.h)
  }

  public get top(): number {
    return this.y
  }
  public get right(): number {
    return this.x + this.w
  }
  public get bottom(): number {
    return this.y + this.h
  }
  public get left(): number {
    return this.x
  }
}
