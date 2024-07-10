import React from 'react'
import Controls from './Controls'
import Frame from './Frame'
import MovingMap from './MovingMap'
import '../App.css'

export default function CenterPanel(props) {
  const { 
    handleTurnLeft,
    handleLevel,
    handleTurnRight,
    handleHeadingMode,
    handleObsLeft,
    handleObs,
    handleObsRight,
    handleCdiLeft,
    handleCdiRight,
    handleBugLeft,
    handleBug,
    handleBugRight,
    handlePause,

    aircraftState,
    instrumentState,
    bugState,
    obsState,
    scaleState,
    handleZoomIn,
    handleZoomOut
  } = props;
  return (
    <div className="center-panel">
      <Controls 
        handleTurnLeft = {handleTurnLeft}
        handleLevel = {handleLevel}
        handleTurnRight = {handleTurnRight}
        handleHeadingMode = {handleHeadingMode}
        handleObsLeft = {handleObsLeft}
        handleObs = {handleObs}
        handleObsRight = {handleObsRight}
        handleCdiLeft = {handleCdiLeft}
        handleCdiRight = {handleCdiRight}
        handleBugLeft = {handleBugLeft}
        handleBug = {handleBug}
        handleBugRight = {handleBugRight}
        handlePause = {handlePause}
      />
      <Frame 
        aircraftState = {aircraftState}
        instrumentState = {instrumentState}
        bugState = {bugState}
        obsState = {obsState}
      />
      <MovingMap 
        aircraftState = {aircraftState}
        instrumentState = {instrumentState}
        obsState = {obsState}
        scaleState = {scaleState}
        handleZoomIn = {handleZoomIn}
        handleZoomOut = {handleZoomOut}
      />
    </div>
  )
}
