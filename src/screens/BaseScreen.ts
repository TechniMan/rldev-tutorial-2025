import type { Display } from 'rot-js'
import type Actor from '../entities/Actor'
import Vector from '../maths/Vector'

export abstract class BaseScreen {
  // abstract inputHandler: BaseInputHandler
  mousePosition: Vector

  protected constructor(
    public display: Display,
    public player: Actor
  ) {
    this.mousePosition = new Vector()
  }

  abstract update(event: KeyboardEvent): BaseScreen
  abstract updateMousePos(m: Vector): void
  abstract render(): void
}