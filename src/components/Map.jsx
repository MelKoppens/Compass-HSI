import React, { useState } from 'react';

export default function Map(props) {
  const { 
    xPosState,
    yPosState,
    headingState
  } = props;
  // console.log(xPosState + ' xPos in Map');
  // console.log(yPosState + ' yPos in Map');
  // console.log(headingState + ' hdg in Map');

  let angle = 180;
  return (
    <div>
      <svg className="Map" width="520" height="500" viewBox={`${xPosState + 256} ${yPosState + 260} 520 500`} xmlns="http://www.w3.org/2000/svg">
      {/* <svg className="Map" width="520" height="500" xmlns="http://www.w3.org/2000/svg"> */}
        <image href="src/assets/Testmap.svg" width="1033" height="1020" transform={`rotate(${-headingState} ${xPosState + 516.5} ${yPosState + 510})`}/>
      </svg>
    </div>
  )
}
