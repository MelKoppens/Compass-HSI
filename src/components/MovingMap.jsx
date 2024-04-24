import React from 'react'
import Map from  './Map'
export default function MovingMap(props) {
  const { 
    xPosState,
    yPosState
  } = props;
  console.log(xPosState + ' in MM');
  console.log(yPosState + ' in MM');
  return (
    <main className="movingmap">
      {/* <h2>I will be a Moving Map Display</h2> */}
      {/* <p><img id="under-construction" src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Under_construction.JPG" alt="outer-frame" /></p> */}
      <Map
        xPosState = {xPosState}
        yPosState = {yPosState} 
      />
    </main>
  
  )
}
