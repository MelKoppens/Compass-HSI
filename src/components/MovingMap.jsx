import React from 'react'
import Map from  './Map'
import Radial from  './Radial'
import MiniPlane from './MiniPlane';
export default function MovingMap(props) {
  const { aircraftState , instrumentState, obsState } = props;

  return (
    <main className="movingmap">
      <Map className="map"
        aircraftState = {aircraftState}
      />
      <Radial className="radial"
        aircraftState = {aircraftState}
        instrumentState = {instrumentState}
        obsState = {obsState}
      />
      <MiniPlane className="mini" />
      {/* <img src="src/assets/miniplane.svg" alt="Miniplane" className="miniplane" width = "40"/> */}
    </main>
  
  )
}
