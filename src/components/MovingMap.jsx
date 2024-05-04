import React from 'react'
import Map from  './Map'
import Radial from  './Radial'
import MiniPlane from './MiniPlane';
export default function MovingMap(props) {
  const { aircraftState , instrumentState, obsState } = props;

  return (
    <main className="movingmap">
      <div className="movingmapElement">
        <Map className="map"
          aircraftState = {aircraftState}
        />
        <Radial className="radial"
          aircraftState = {aircraftState}
          instrumentState = {instrumentState}
          obsState = {obsState}
        />
        <MiniPlane className="mini" />
      </div>
    </main>
  
  )
}
