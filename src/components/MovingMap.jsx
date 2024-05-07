import '../App.css';
import React from 'react'
import Map from  './Map'
import Radial from  './Radial'
import MiniPlane from './MiniPlane';
import ZoomControls from './ZoomControls';
export default function MovingMap(props) {
  const { 
    aircraftState,
    instrumentState,
    obsState,
    scaleState,
    handleZoomIn,
    handleZoomOut
  } = props;

  return (
    <main className="movingmap">
      <div className="movingmapElement">
        <Map className="map"
          aircraftState = {aircraftState}
          instrumentState = {instrumentState}
          obsState = {obsState}
          scaleState = {scaleState}
        />
        <ZoomControls className="zoom"
          handleZoomIn = {handleZoomIn} 
          handleZoomOut = {handleZoomOut}
          scaleState = {scaleState}
        />
        {/* <Radial className="radial"
          aircraftState = {aircraftState}
          instrumentState = {instrumentState}
          obsState = {obsState}
        /> */}
        {/* <MiniPlane className="mini" /> */}
      </div>
    </main>
  
  )
}
