import { toHex } from 'rot-js/lib/color'

/**
 *  Used to hold r,g,b values for a colour, each between 0-255.
 */
export default class Colour {
  private _r: number
  private _g: number
  private _b: number

  /**
   * Returns a hexcode representation of the Colour for use with ROT's draw functions.
   */
  public get asHex(): string {
    return toHex([this._r, this._g, this._b])
  }

  private constructor(
    r: number,
    g: number,
    b: number
  ) {
    this._r = r
    this._g = g
    this._b = b
  }

  /**
   * Construct a Colour object from 
   * @param r Red component of the colour.
   * @param g Green component of the colour.
   * @param b Blue component of the colour.
   * @returns The colour object.
   */
  public static rgb(
    r: number,
    g: number,
    b: number
  ) {
    return new Colour(r, g, b)
  }

  /**
   * Create a Colour that is a result of multiplying the given number with each
   *  component (r, g, b) of the original Colour.
   * @param x The multiplier.
   * @returns The multiplied colour.
   */
  multiply(x: number) {
    return new Colour(x * this._r, x * this._g, x * this._b)
  }
}
