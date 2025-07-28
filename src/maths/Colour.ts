import { toHex } from 'rot-js/lib/color'

// Used to hold r,g,b values for a colour between 0-255
export default class Colour {
  private _r: number
  private _g: number
  private _b: number

  public get asHex(): string {
    return toHex([this._r, this._g, this._b])
  }

  constructor(
    r: number,
    g: number,
    b: number
  ) {
    this._r = r
    this._g = g
    this._b = b
  }

  multiply(x: number) {
    return new Colour(x * this._r, x * this._g, x * this._b)
  }
}
