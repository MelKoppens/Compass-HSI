import React from 'react'
import Compass from './Compass'

export default function Frame() {
  
  return (
    <main className="framework">
      <Compass />
      <img id="outer-frame" src="src/assets/OuterFramwork.svg" alt="outer-frame" />
    </main>
  )
}
