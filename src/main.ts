import { Engine } from './engine/Engine.ts'
import './extensions/Array.ts'

window.addEventListener('DOMContentLoaded', () => {
  // nice, dark background
  document.body.style.backgroundColor = 'black'

  // set up the engine and set it off
  const engine = new Engine()
})
