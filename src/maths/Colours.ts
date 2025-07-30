import Colour from './Colour'

// greyscales
export function black(): Colour {
  return Colour.rgb(0, 0, 0)
}
export function grey(): Colour {
  return Colour.rgb(128, 128, 128)
}
export function white(): Colour {
  return Colour.rgb(255, 255, 255)
}

// colours
export function brown(): Colour {
  return Colour.rgb(128, 48, 48)
}
export function dimBrown(): Colour {
  return Colour.rgb(64, 48, 48)
}
export function dimRed(): Colour {
  return Colour.rgb(192, 0, 0)
}
export function brightRed(): Colour {
  return Colour.rgb(255, 0, 0)
}
export function dimGreen(): Colour {
  return Colour.rgb(0, 192, 0)
}
export function brightGreen(): Colour {
  return Colour.rgb(0, 255, 0)
}
export function dimBlue(): Colour {
  return Colour.rgb(0, 0, 192)
}
export function brightBlue(): Colour {
  return Colour.rgb(0, 0, 255)
}

// variables
export const planetBrightFg = black
export const planetBrightBg = brown
export const planetDarkFg = black
export const planetDarkBg = dimBrown
export const entityFg = white

export const uiBg = black
export const uiFg = dimGreen
export const blank = black
