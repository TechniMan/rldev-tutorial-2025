export default class Vector {
  private _x: number
  private _y: number

  public get x() {
    return this._x
  }
  public get y() {
    return this._y
  }
  public get length() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y))
  }

  constructor(x: number = 0, y: number = 0) {
    this._x = x
    this._y = y
  }

  plus(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y)
  }

  subtract(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y)
  }

  dot(other: Vector): Vector {
    return new Vector(this.x * other.x, this.y * other.y)
  }

  matches(other: Vector): boolean {
    return this.x === other.x && this.y === other.y
  }
}