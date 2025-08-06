import type Vector from '../maths/Vector'
import { Fighter } from './components'
import Entity from './Entity'
import RenderOrder from './RenderOrder'

export default class Actor extends Entity {
  public fighter: Fighter

  constructor(
    public position: Vector,
    public char: string,
    public fg: string = '#fff',
    public bg: string = '#000',
    public name: string = '<Unnamed Entity>',
    //TODO public ai: BaseAI | null,
    fighterStats: Array<number>,
    //TODO public inventory: Inventory,
    //TODO public level: Level
  ) {
    super(position, char, fg, bg, name, true, RenderOrder.Actor)
    this.fighter = new Fighter(fighterStats[0], fighterStats[1], fighterStats[2], this)
  }

  public get isAlive(): boolean {
    return true
    //TODO return !!this.ai || window.engine.player === this
  }
}
