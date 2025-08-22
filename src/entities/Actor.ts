import type Vector from '../maths/Vector'
import { Fighter } from './components'
import type { BaseAI } from './components/ai/BaseAI'
import Entity from './Entity'
import RenderOrder from './RenderOrder'
import * as Colours from '../maths/Colours'

export default class Actor extends Entity {
  public fighter: Fighter

  constructor(
    public position: Vector,
    public char: string,
    public fg: string = '#fff',
    public bg: string = '#000',
    public name: string = '<Unnamed Entity>',
    public ai: BaseAI | null,
    fighterStats: Array<number>,
    //TODO public inventory: Inventory,
    //TODO public level: Level
  ) {
    super(position, char, fg, bg, name, true, RenderOrder.Actor)
    this.fighter = new Fighter(fighterStats[0], fighterStats[1], fighterStats[2], this)
  }

  public get isAlive(): boolean {
    return this.fighter.isAlive
    //TODO return !!this.ai || window.engine.player === this
  }

  public get isPlayer(): boolean {
    return this.name === 'Player'
  }

  public die(): string {
    let deathMessage = ''
    if (this.isPlayer) {
      deathMessage = 'You died!'
    } else {
      deathMessage = `${this.name} has died.`
    }

    this.char = '%'
    this.fg = Colours.brightRed().asHex
    this.blocksMovement = false
    this.ai = null
    this.name = `Remains of ${this.name}`
    this.renderOrder = RenderOrder.Corpse

    return deathMessage
  }
}
