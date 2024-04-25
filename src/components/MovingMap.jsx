import React from 'react'
import Map from  './Map'
export default function MovingMap(props) {
  const { aircraftState } = props;

  return (
    <main className="movingmap">
      <Map className="map"
        aircraftState = {aircraftState}
      />
      <img src="src/assets/miniplane.svg" alt="Miniplane" className="miniplane" width = "40"/>
    </main>
  
  )
}
