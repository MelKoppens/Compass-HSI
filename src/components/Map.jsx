import React, { useState } from 'react';

export default function Map(props) {
  const { aircraftState } = props;

  return (
    <div>
      <svg className="Map" width="520" height="500" viewBox={`${aircraftState.xPos + 256} ${aircraftState.yPos + 260} 520 500`} xmlns="http://www.w3.org/2000/svg">
        <image href="src/assets/Testmap.svg" width="1033" height="1020" transform={`rotate(${-aircraftState.heading} ${aircraftState.xPos + 516.5} ${aircraftState.yPos + 510})`}/>
      </svg>
    </div>
  )
}
