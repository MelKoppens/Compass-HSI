import React from 'react'
import Map from  './Map'
export default function MovingMap(props) {
  const { 
    xPosState,
    yPosState,
    headingState
  } = props;
  // console.log(xPosState + ' xPos in MM');
  // console.log(yPosState + ' yPos in MM');
  // console.log(headingState + ' hdg in MM');
  return (
    <main className="movingmap">
      <Map
        xPosState = {xPosState}
        yPosState = {yPosState}
        headingState = {headingState} 
      />
    </main>
  
  )
}
