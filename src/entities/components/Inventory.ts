import { BaseComponent } from './BaseComponent'

export class Inventory extends BaseComponent {
  // items: Item[]
  private _ammoCurrent: number
  public get ammoCurrent(): number { return this._ammoCurrent }
  private _ammoMax: number
  public get ammoMax(): number { return this._ammoMax }
  public get ammoPercentage(): number { return this.ammoCurrent / this.ammoMax }
  private _magazineCurrent: number
  public get magazineCurrent(): number { return this._magazineCurrent }
  private _magazineMax: number
  public get magazineMax(): number { return this._magazineMax }

  constructor(
    magazineSize: number,
    magazineCount: number,
    magazineMaxCount: number = magazineCount
  ) {
    super()

    this._ammoMax = magazineSize
    this._ammoCurrent = magazineSize
    this._magazineMax = magazineMaxCount
    this._magazineCurrent = magazineCount
  }

  /**
   * Attempts to fire a single round from the weapon
   * @returns whether the weapon fired
   */
  public attemptToFire(): boolean {
    if (this.ammoCurrent) {
      this._ammoCurrent -= 1
      return true
    }
    return false
  }

  /**
   * Attempts to reload the weapon with a new magazine.
   * Remaining rounds in the current magazine are discarded.
   * @returns whether the weapon was reloaded
   */
  public attemptToReload(): boolean {
    if (this.magazineCurrent) {
      this._magazineCurrent -= 1
      this._ammoCurrent = this._ammoMax
      return true
    }
    return false
  }

  /**
   * Pick up a quantity of magazines.
   * @param count How many magazines can be picked up
   * @returns how many magazines have been picked up
   */
  public pickupMagazines(count: number): number {
    const pickedUp = Math.min(this.magazineMax, this.magazineCurrent + count) - this.magazineCurrent
    this._magazineCurrent += pickedUp
    return pickedUp
  }
}