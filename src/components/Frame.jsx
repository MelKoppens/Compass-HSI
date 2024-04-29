import React from 'react'
import Compass from './Compass'
import CompassFrame from './CompassFrame'

export default function Frame() {
  
  return (
    <main className="framework">
      <Compass />
      <CompassFrame />
      {/* <img id="outer-frame" src="src/assets/OuterFramwork.svg" alt="outer-frame" /> */}
    </main>
  )
}
