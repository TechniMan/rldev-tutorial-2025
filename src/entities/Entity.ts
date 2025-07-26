import Vector from '../maths/Vector'
import RenderOrder from './RenderOrder'

export default class Entity {
  constructor(
    public position: Vector,
    public char: string,
    public fg: string = '#fff',
    public bg: string = '#000',
    public name: string = '<Unnamed Entity>',
    public blocksMovement: boolean = false,
    public renderOrder: RenderOrder = RenderOrder.Corpse
  ) {
  }

  move(delta: Vector): void {
    this.position = this.position.plus(delta)
  }
}
