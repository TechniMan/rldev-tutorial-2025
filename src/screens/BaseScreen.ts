import type { Display } from 'rot-js'
import type Actor from '../entities/Actor'

export abstract class BaseScreen {
  // abstract inputHandler: BaseInputHandler

  protected constructor(
    public display: Display,
    public player: Actor
  ) {
  }

  abstract update(event: KeyboardEvent): BaseScreen
  abstract render(): void
}