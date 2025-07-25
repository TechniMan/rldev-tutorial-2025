export default class Vector {
  private _x: number
  private _y: number

  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }

  public get x() {
    return this._x
  }
  public get y() {
    return this._y
  }

  public get length() {
    return Math.sqrt((this._x * this._x) + (this._y * this._y))
  }

  add(other: Vector): Vector {
    return new Vector(this._x + other._x, this._y + other._y)
  }

  subtract(other: Vector): Vector {
    return new Vector(this._x - other._x, this._y - other._y)
  }

  dot(other: Vector): Vector {
    return new Vector(this._x * other._x, this._y * other._y)
  }
}