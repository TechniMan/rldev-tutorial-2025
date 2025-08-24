import type { Display } from 'rot-js'
import { BaseScreen } from './BaseScreen'
import type { GameMap } from '../engine/GameMap'
import { RockyDesert } from '../procgen/maps'
import Vector from '../maths/Vector'
import * as Colours from '../maths/Colours'
import Rect from '../maths/Rect'
import { Engine } from '../engine/Engine'
import type Actor from '../entities/Actor'
import MessageLog from '../engine/MessageLog'
import MouseButton from '../input/MouseButton'
import { GameInputHandler, type BaseInputHandler } from '../input/BaseInputHandler'
import { spawnPlayer } from '../entities/spawn'

export class GameScreen extends BaseScreen {
  gameMap!: GameMap
  messageLog: MessageLog
  inputHandler: BaseInputHandler

  // render areas
  mapRenderRect: Rect
  uiRenderRect: Rect
  msgRenderRect: Rect

  currentlyHighlightedEnemy?: Actor

  constructor(
    display: Display,
    // serialisedGameMap: string | null = null
  ) {
    super(display, spawnPlayer(new Vector()))

    this.inputHandler = new GameInputHandler()
    this.messageLog = new MessageLog()
    this.messageLog.post('Welcome! Use the numpad keys to move (inc. 5 to wait), and click an enemy to shoot them.')

    // let's get ready to rendeeeer!
    this.mapRenderRect = new Rect(
      0, 0,
      Engine.SCREEN_WIDTH - 16, Engine.SCREEN_HEIGHT - 16
    )
    this.uiRenderRect = new Rect(
      this.mapRenderRect.right, 0,
      16, Engine.SCREEN_HEIGHT - 16
    )
    this.msgRenderRect = new Rect(0, 0, 0, 0)

    //TODO load from the serialisedGameMap
    // else generate a level
    this.generateLevel()
  }

  generateLevel(): void {
    const map = RockyDesert(64, 64, this.player)
    this.gameMap = map

    // finally, trigger a fresh update and draw to screen the new map
    this.gameMap.updateFov(this.player.position)
    this.render()
  }

  handleEnemyTurns() {
    this.gameMap.livingActors.forEach(a => {
      a.ai?.perform(a, this.gameMap, this.messageLog)
    })
  }

  update(event: KeyboardEvent | null): BaseScreen {
    if (event) {
      const action = this.inputHandler.onKeyPress(event, this.player)

      // if acting
      if (action) {
        // have the player perform it
        action.perform(this.player, this.gameMap, this.messageLog)
        this.handleEnemyTurns()
        this.gameMap.updateFov(this.player.position)
      }
    }

    // this.inputHandler = this.inputHandler.nextHandler

    // update the screen
    this.render()

    return this
  }

  onMouseMove(mousePos: Vector): void {
    const checkPos = mousePos.minus(this.mapRenderRect.centre).plus(this.player.position)
    this.inputHandler.onMouseMove(mousePos, checkPos)

    const e = this.gameMap.getBlockingEntityAtLocation(
      checkPos.x,
      checkPos.y
    )
    this.currentlyHighlightedEnemy = e && e.name !== this.player.name ? e as Actor : undefined
  }

  onMouseClick(mb: MouseButton): void {
    const action = this.inputHandler.onMouseClick(mb, this.player, this.gameMap)

    if (action) {
      // have the palyer perform it
      action.perform(this.player, this.gameMap, this.messageLog)
      // and give the enemies a turn
      this.handleEnemyTurns()
      this.gameMap.updateFov(this.player.position)
    }

    // this.inputHandler = this.inputHandler.nextHandler

    // update the screen
    this.render()
  }

  render(): void {
    // clear display
    this.display.clear()

    // draw map (first so UI etc goes on top)
    this.gameMap.draw(this.display, this.mapRenderRect, this.player.position)

    let uiX = this.uiRenderRect.left
    let uiY = this.uiRenderRect.top
    const uiW = this.uiRenderRect.size.x
    // const uiH = this.uiRenderRect.size.y

    // player frame
    this.display.drawFrameWithTitle(
      uiX, uiY, uiW, 15,
      'Player'
    )
    uiY += 1

    // health bar
    this.display.drawText(uiX + 1, uiY, 'Health:')
    uiY += 1
    let barWidth = Math.floor(this.player.fighter.percentageHp * (uiW - 2))
    this.display.drawColouredBar(uiX + 1, uiY, uiW - 2, Colours.dimRed().asHex)
    this.display.drawColouredBar(uiX + 1, uiY, barWidth, Colours.brightGreen().asHex)
    let barText = `${this.player.fighter.currentHp}/${this.player.fighter.maxHp}`
    this.display.drawTextOver(uiX + 1, uiY, barText, Colours.black().asHex)
    uiY += 2

    // weapon stats
    this.display.drawText(uiX + 1, uiY, 'Weapon:')
    uiY += 1
    this.display.drawText(uiX + 1, uiY, 'Gun')
    uiY += 2
    this.display.drawText(uiX + 1, uiY, 'Ammunition:')
    uiY += 1
    barWidth = Math.floor(this.player.inventory!.ammoPercentage * (uiW - 2))
    this.display.drawColouredBar(uiX + 1, uiY, uiW - 2, Colours.dimRed().asHex)
    this.display.drawColouredBar(uiX + 1, uiY, barWidth, Colours.brightGreen().asHex)
    uiY += 2
    this.display.drawText(uiX + 1, uiY, `Magazines: ${this.player.inventory!.magazineCurrent}/${this.player.inventory!.magazineMax}`)
    uiY += 2
    this.display.drawText(uiX + 1, uiY, 'Accuracy:')
    uiY += 1
    barWidth = Math.floor(0.5 * (uiW - 2))
    this.display.drawColouredBar(uiX + 1, uiY, uiW - 2, Colours.dimRed().asHex)
    this.display.drawColouredBar(uiX + 1, uiY, barWidth, Colours.brightGreen().asHex)
    this.display.drawTextOver(uiX + 1, uiY, 'workinprogress', Colours.black().asHex)
    uiY += 1

    uiY = 48 - 4

    // enemy frame
    this.display.drawFrameWithTitle(
      uiX, uiY, uiW, 4,
      this.currentlyHighlightedEnemy?.name || 'Enemy',
      Colours.brightRed().asHex
    )
    if (this.currentlyHighlightedEnemy) {
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
      0, Engine.MAP_HEIGHT,
      Engine.SCREEN_WIDTH, Engine.SCREEN_HEIGHT - Engine.MAP_HEIGHT,
      'Messages'
    )
    this.msgRenderRect = new Rect(
      1, Engine.MAP_HEIGHT + 1,
      Engine.SCREEN_WIDTH - 2, Engine.SCREEN_HEIGHT - Engine.MAP_HEIGHT - 2
    )
    this.messageLog.draw(
      this.display,
      this.msgRenderRect
    )
  }
}
