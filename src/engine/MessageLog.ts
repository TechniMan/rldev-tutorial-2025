import { Display } from 'rot-js'
import type Rect from '../maths/Rect'

export default class MessageLog {
  private _log: string[]

  public constructor() {
    this._log = []
  }

  public post(msg: string): void {
    this._log.push(msg)
  }

  public get messages(): string[] {
    return this._log.slice().reverse()
  }

  public draw(
    display: Display,
    destination: Rect
  ): void {
    let yOffset = destination.size.y - 1
    const width = destination.size.x

    for (const msg of this.messages) {
      // split message across lines if necessary
      let lines = []
      // if it fits, it sits
      if (msg.length <= width) {
        lines.push(msg)
      } else {
        const words = msg.split(' ')
        let currentLine = ''

        // loop through the words until we fill a line
        while (words.length > 0) {
          if (`${currentLine} ${words[0]}`.length > width) {
            lines.push(currentLine)
            currentLine = ''
          } else {
            if (currentLine) {
              // pop the next word from the array with a space after the previous word
              currentLine += ' ' + words.shift()
            } else {
              // pop the next word from the array at the start of this line
              currentLine += words.shift()
            }
          }
        }

        // push the last bit of line into the list
        lines.push(currentLine)
        // reverse the lines so we draw bottom up
        lines.reverse()
      }

      // draw all lines of the message
      for (const line of lines) {
        // draw the message
        display.drawText(
          destination.left,
          destination.top + yOffset,
          line,
          destination.size.x
        )
        // move up 1 for the next line
        yOffset -= 1
        // if we've reached the top of the frame, return early;
        //  don't draw any other messages
        if (yOffset < 0) {
          return
        }
      }
    }
  }
}
