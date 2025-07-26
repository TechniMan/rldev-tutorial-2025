import type Vector from '../maths/Vector'
import Entity from './Entity'
import RenderOrder from './RenderOrder'

export default class Actor extends Entity {
  constructor(
    public position: Vector,
    public char: string,
    public fg: string = '#fff',
    public bg: string = '#000',
    public name: string = '<Unnamed Entity>',
    //TODO public ai: BaseAI | null,
    //TODO public fighter: Fighter,
    //TODO public inventory: Inventory,
    //TODO public level: Level
  ) {
    super(position, char, fg, bg, name, true, RenderOrder.Actor)
  }

  public get isAlive(): boolean {
    return true
    //TODO return !!this.ai || window.engine.player === this
  }
}
