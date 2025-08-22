import type { Display } from 'rot-js'
import type Actor from '../entities/Actor'
import Vector from '../maths/Vector'
import type MouseButton from '../input/MouseButton'

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
  abstract onMouseMove(m: Vector): void
  abstract onMouseClick(mb: MouseButton): void
  abstract render(): void
}