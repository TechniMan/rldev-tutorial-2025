import Colour from './Colour'

export function black(): Colour {
  return new Colour(0, 0, 0)
}

export function grey(): Colour {
  return new Colour(128, 128, 128)
}

export function white(): Colour {
  return new Colour(255, 255, 255)
}

export function brown(): Colour {
  return new Colour(128, 48, 48)
}
export function dimBrown(): Colour {
  return new Colour(64, 48, 48)
}

export function red(): Colour {
  return new Colour(255, 0, 0)
}
export function green(): Colour {
  return new Colour(0, 255, 0)
}
export function blue(): Colour {
  return new Colour(0, 0, 255)
}

// variables
export const planetBright = brown
export const planetDim = dimBrown
export const uiFg = black
export const uiBg = grey
