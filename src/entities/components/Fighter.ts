import type Actor from '../Actor'
import { BaseComponent } from './BaseComponent'

export class Fighter extends BaseComponent {
  protected parent: Actor | null
  private _maxHp: number
  private _currentHp: number
  private _defense: number
  private _power: number

  public get currentHp(): number {
    return this._currentHp
  }

  public get maxHp(): number {
    return this._maxHp
  }

  public get percentageHp(): number {
    return this._currentHp / this._maxHp
  }

  public get isAlive(): boolean {
    return this._currentHp > 0
  }

  public get power(): number {
    return this._power
  }

  constructor(
    maxHp: number,
    defense: number,
    power: number,
    parent: Actor
  ) {
    super()
    this.parent = parent
    this._maxHp = maxHp
    this._currentHp = maxHp
    this._defense = defense
    this._power = power
  }

  /**
   * Heals the fighter by given amount.
   * @param amount Amount of HP to heal.
   * @returns Amount actually healed.
   */
  public heal(amount: number): number {
    const newHp = Math.min(this._maxHp, this._currentHp + amount)
    const amountRecovered = newHp - this._currentHp
    this._currentHp = newHp
    return amountRecovered
  }

  /**
   * Damages the figher by given amount.
   * @param attackPower Power of incoming attack.
   * @returns Whether the fighter is still alive.
   * TODO return xp value of fighter if died?, or -1 if still alive
   */
  public damage(attackPower: number): boolean {
    const damageAmount = attackPower - this._defense
    this._currentHp -= damageAmount
    if (this._currentHp <= 0) {
      //TODO build a message about the death of the fighter and send to logger

      return false
    }
    return true
  }
}
