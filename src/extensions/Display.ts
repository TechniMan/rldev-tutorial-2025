import { Display } from 'rot-js'

declare module 'rot-js' {
  interface Display {
    drawFrameWithTitle(
      x: number,
      y: number,
      width: number,
      height: number,
      title: string,
      colour?: string
    ): void

    drawColouredBar(
      x: number,
      y: number,
      width: number,
      colour: string
    ): void

    drawTextOver(
      x: number,
      y: number,
      text: string,
      colour: string
    ): void
  }
}

Display.prototype.drawFrameWithTitle = function (
  this: Display,
  x: number,
  y: number,
  width: number,
  height: number,
  title: string,
  colour?: string
) {
  // characters for the frame
  const topLeft = '┌'
  const topRight = '┐'
  const bottomLeft = '└'
  const bottomRight = '┘'
  const vertical = '│'
  const horizontal = '─'
  const leftTitle = '┤'
  const rightTitle = '├'
  const empty = ' '
  // sizings
  const innerWidth = width - 2
  const innerHeight = height - 2
  const remainingAfterTitle = Math.max(innerWidth - (title.length + 2), 0) // add two for the borders either side of the title
  const left = Math.floor(remainingAfterTitle / 2)
  // strings that represent each row
  const topRow =
    topLeft +
    horizontal.repeat(left) +
    leftTitle +
    title +
    rightTitle +
    horizontal.repeat(remainingAfterTitle - left) +
    topRight
  const middleRow = vertical + empty.repeat(innerWidth) + vertical
  const bottomRow = bottomLeft + horizontal.repeat(innerWidth) + bottomRight
  const c = colour || this.getOptions().fg
  // actually draw the box
  this.drawTextOver(x, y, topRow, c)
  for (let r = 1; r <= innerHeight; ++r) {
    this.drawTextOver(x, y + r, middleRow, c)
  }
  this.drawTextOver(x, y + height - 1, bottomRow, c)
}

Display.prototype.drawColouredBar = function (
  this: Display,
  x: number,
  y: number,
  width: number,
  colour: string
): void {
  for (let pos = x; pos < x + width; ++pos) {
    this.draw(pos, y, ' ', colour, colour)
  }
}

Display.prototype.drawTextOver = function (
  this: Display,
  x: number,
  y: number,
  text: string,
  colour: string
): void {
  // to draw text on top of something, we have to draw each character
  for (let idx = 0; idx < text.length; ++idx) {
    this.drawOver(
      x + idx,
      y,
      text[idx],
      colour,
      null
    )
  }
}
