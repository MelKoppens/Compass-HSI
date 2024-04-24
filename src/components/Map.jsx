import React, { useState } from 'react';

export default function Map(props) {
  const { 
    xPosState,
    yPosState
  } = props;
  console.log(xPosState + ' in Map');
  console.log(yPosState + ' in Map');

  return (
    <div>
      <svg className="Map" width="520" height="500" viewBox={`${xPosState} ${yPosState} 520 500`} xmlns="http://www.w3.org/2000/svg">
        <image href="src/assets/Testmap.svg" width="1033" height="1020"/>
      </svg>
    </div>
  )
}
