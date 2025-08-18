import type { Display } from 'rot-js'
import { BaseScreen } from './BaseScreen'
import type { GameMap } from '../engine/GameMap'
import { RockyDesert } from '../procgen/maps'
import Vector from '../maths/Vector'
import { BumpAction } from '../input/Action'
import * as Colours from '../maths/Colours'
import Rect from '../maths/Rect'
import { Engine } from '../engine/Engine'
import type Actor from '../entities/Actor'
import MessageLog from '../engine/MessageLog'

export class GameScreen extends BaseScreen {
  gameMap: GameMap
  messageLog: MessageLog

  // render areas
  mapRenderRect: Rect
  uiRenderRect: Rect
  msgRenderRect: Rect

  currentlyHighlightedEnemy?: Actor

  constructor(
    display: Display,
    // serialisedGameMap: string | null = null
  ) {
    //TODO load from the serialisedGameMap
    //TODO else generateFloor:
    const map = RockyDesert(64, 64)
    super(display, map.player)
    this.gameMap = map

    //TODO init inputhandler
    this.messageLog = new MessageLog()

    // let's get ready to rendeeeer!
    this.mapRenderRect = new Rect(
      0, 0,
      Engine.SCREEN_WIDTH - 16, Engine.SCREEN_HEIGHT
    )
    this.uiRenderRect = new Rect(
      this.mapRenderRect.right, 0,
      16, Engine.SCREEN_HEIGHT
    )
    this.msgRenderRect = new Rect(0, 0, 0, 0)

    // initial update/draw
    this.update(null)
  }

  update(event: KeyboardEvent | null): BaseScreen {
    //TODO use inputHandler to determine appropriate action
    // update player position from movement
    let movement = { x: 0, y: 0 }
    switch (event?.key) {
      case '8':
        movement.y = -1
        break
      case '2':
        movement.y = 1
        break
      case '4':
        movement.x = -1
        break
      case '6':
        movement.x = 1
        break
      case '7':
        movement.x = -1
        movement.y = -1
        break
      case '9':
        movement.x = 1
        movement.y = -1
        break
      case '3':
        movement.x = 1
        movement.y = 1
        break
      case '1':
        movement.x = -1
        movement.y = 1
        break
    }

    // create the relevant action
    if (movement.x || movement.y) {
      const action = new BumpAction(new Vector(
        movement.x,
        movement.y
      ))
      // have the player perform it
      action.perform(this.player, this.gameMap, this.messageLog)
    }

    // update fov in map
    this.gameMap.updateFov()

    // update the screen
    this.render()

    return this
  }

  updateMousePos(mousePos: Vector): void {
    const checkPos = mousePos.minus(this.mapRenderRect.centre).plus(this.player.position)
    const e = this.gameMap.getBlockingEntityAtLocation(
      checkPos.x,
      checkPos.y
    )
    this.currentlyHighlightedEnemy = e && e.name !== this.player.name ? e as Actor : undefined
  }

  render(): void {
    // clear display
    this.display.clear()

    // draw map (first so UI etc goes on top)
    this.gameMap.draw(this.display, this.mapRenderRect)

    let uiX = this.uiRenderRect.left
    let uiY = this.uiRenderRect.top
    const uiW = this.uiRenderRect.size.x
    const uiH = this.uiRenderRect.size.y

    // player frame
    this.display.drawFrameWithTitle(
      uiX, uiY, uiW, 4,
      'Player'
    )
    // health bar
    uiY += 1
    this.display.drawText(uiX + 1, uiY, 'Health:')
    uiY += 1
    let barWidth = Math.floor(this.player.fighter.percentageHp * (uiW - 2))
    this.display.drawColouredBar(uiX + 1, uiY, uiW - 2, Colours.dimRed().asHex)
    this.display.drawColouredBar(uiX + 1, uiY, barWidth, Colours.brightGreen().asHex)
    // health text
    let barText = `${this.player.fighter.currentHp}/${this.player.fighter.maxHp}`
    this.display.drawTextOver(uiX + 1, uiY, barText, Colours.black().asHex)
    uiY += 1

    uiY += 1

    // enemy frame
    if (this.currentlyHighlightedEnemy) {
      this.display.drawFrameWithTitle(
        uiX, uiY, uiW, 4,
        this.currentlyHighlightedEnemy.name,
        Colours.brightRed().asHex
      )
      // health bar
      uiY += 1
      this.display.drawTextOver(uiX + 1, uiY, 'Health:', Colours.brightRed().asHex)
      uiY += 1
      barWidth = Math.floor(this.currentlyHighlightedEnemy.fighter.percentageHp * (uiW - 2))
      this.display.drawColouredBar(uiX + 1, uiY, uiW - 2, Colours.dimRed().asHex)
      this.display.drawColouredBar(uiX + 1, uiY, barWidth, Colours.brightRed().asHex)
      // health text
      barText = `${this.currentlyHighlightedEnemy.fighter.currentHp}/${this.currentlyHighlightedEnemy.fighter.maxHp}`
      this.display.drawTextOver(uiX + 1, uiY, barText, Colours.black().asHex)
      uiY += 2
    }

    // messages frame
    this.display.drawFrameWithTitle(
      uiX, uiY, uiW, uiH - uiY,
      'Messages'
    )
    this.msgRenderRect = new Rect(
      uiX + 1, uiY + 1,
      uiW - 2, uiH - uiY - 2
    )
    console.log(this.msgRenderRect)
    this.messageLog.draw(
      this.display,
      this.msgRenderRect
    )
  }
}
