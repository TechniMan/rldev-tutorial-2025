import { Engine } from './engine/Engine.ts'
import './extensions/Array.ts'

declare global {
  interface Window {
    engine: Engine
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // nice, dark background
  document.body.style.backgroundColor = 'black'

  // set up the engine and set it off
  window.engine = new Engine()
})
