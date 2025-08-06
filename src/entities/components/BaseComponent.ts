import type Entity from '../Entity'

export abstract class BaseComponent {
  protected parent: Entity | null = null

  protected constructor() {
  }
}
