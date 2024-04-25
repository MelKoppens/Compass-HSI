import React, { useState, useEffect } from 'react'
import Controls from './components/Controls'
import Frame from './components/Frame'
import MovingMap from './components/MovingMap'
import './App.css'

let FPS = 10; // determines how fast states are updated 
let TURN_RATE = 3; // determine the turn rate (3 deg/sec is standard in aviation)
let SPEED = 120; // in KTS

function App() {
  const [aircraftState, setAircraftState] = useState({heading: 0, xPos: 0, yPos: 0});
  const [obsState, setObsState] = useState(30);
  const [cdiState, setCdiState] = useState(0);
  const [bugState, setBugState] = useState(0);
  const [turnState, setTurnState] = useState('right'); // 'left' , 'right' , 'level

  // handle left turn
  const handleTurnLeft = () => {
    // Set turnState to left
    setTurnState('left');
  };

  // handle right turn
  const handleTurnLevel = () => {
    // Set turnState to left
    setTurnState('level');
  };

   // handle right turn
   const handleTurnRight = () => {
    // Set turnState to left
    setTurnState('right');
  };
  
  // handle obs left input
  const handleObsLeft = () => {
    // Turn OBS 1 degree left
    let div = document.querySelector('.hsi');
    setObsState((prevObs) => {
      const newObs = prevObs - 1;
      div.style.transform = `rotate(${newObs}deg)`;
      return newObs;
    })
  };

  // handle obs right input
  const handleObsRight = () => {
    // Turn OBS 1 degree right
    let div = document.querySelector('.hsi');
    setObsState((prevObs) => {
      const newObs = prevObs + 1;
      div.style.transform = `rotate(${newObs}deg)`;
      return newObs;
    })
  };

  // handle cdi left input
  const handleCdiLeft = () => {
    // Turn CDI 0.4 degree left, limit 10 deg (not possible directly in an AC)
    let div = document.querySelector('.cdi');
    setCdiState((prevCdi) => {
      let newCdi;
      if (prevCdi > -25) {
        newCdi = prevCdi - 1;
      } else {
        newCdi = prevCdi;
      }
      div.style.left = `${newCdi}%`;
      return newCdi;
    })
  };

  // handle cdi right input
  const handleCdiRight = () => {
    // Turn CDI .4 degree right, limit 10 deg (not possible directly in an AC)
    let div = document.querySelector('.cdi');
    setCdiState((prevCdi) => {
      let newCdi;
      if (prevCdi < 25) {
        newCdi = prevCdi + 1;
      } else {
        newCdi = prevCdi;
      }
      div.style.left = `${newCdi}%`;
      return newCdi;
    })
  };
  
  // handle hdg bug left input
  const handleBugLeft = () => {
    // Turn BUG 1 degree left
    let div = document.querySelector('.bug');
    setBugState((prevBug) => {
      const newBug = prevBug - 1;
      div.style.transform = `rotate(${newBug}deg)`;
      return newBug;
    })
  };

  // handle hdg bug right input
  const handleBugRight = () => {
    // Turn BUG 1 degree right
    let div = document.querySelector('.bug');
    setBugState((prevBug) => {
      const newBug = prevBug + 1;
      div.style.transform = `rotate(${newBug}deg)`;
      return newBug;
    })
  };

  // module to test states
  // useEffect(() => {
 
  // }, [aircraftState]);

  // Game loop for updating opponent positions, collisions, etc.
  useEffect(() => {
    let comp = document.querySelector('.compass');
    const gameLoop = setInterval(() => {
      // Update opponent positions, handle collisions, etc.

      // Handle aircraft movement
      setAircraftState((prevAircraftState) => {
        // console.log(prevAircraftState);
        let newHeading;
        if (turnState === 'left') {
          newHeading = prevAircraftState.heading - (TURN_RATE / FPS); // 3 refers to std rate of turn (3deg per sec)
        } else if (turnState === 'right') {
          newHeading = prevAircraftState.heading + (TURN_RATE / FPS);
        } else {
          newHeading = prevAircraftState.heading;
        }
        comp.style.transform = `rotate(${-newHeading}deg)`;

        let newXPos = prevAircraftState.xPos + Math.sin(newHeading * Math.PI / 180) * SPEED / ( FPS * 36 );
        let newYPos = prevAircraftState.yPos - Math.cos(newHeading * Math.PI / 180) * SPEED / ( FPS * 36 );

        let newAircraftState = {
          heading: newHeading,
          xPos: newXPos,
          yPos: newYPos
        }
        return newAircraftState;
      });

      // Handle forward movement
      // setXPosState((prevXPos) => {
      //   let newXPos;  
      //   newXPos = prevXPos + Math.sin(headingState * Math.PI / 180) * SPEED / ( FPS * 36 );
      //   return newXPos;
      // });
      
      // setYPosState((prevYPos) => {
      //   let newYPos;
      //   newYPos = prevYPos - Math.cos(headingState * Math.PI / 180) * SPEED / ( FPS * 36 );
      //   return newYPos;
      // });

    }, 1000 / FPS);
    return () => clearInterval(gameLoop);
  }, [turnState]);

  // const [count, setCount] = useState(0)

  return (
    <div>
      <Controls 
        handleTurnLeft = {handleTurnLeft}
        handleTurnLevel = {handleTurnLevel}
        handleTurnRight = {handleTurnRight}
        handleObsLeft = {handleObsLeft}
        handleObsRight = {handleObsRight}
        handleCdiLeft = {handleCdiLeft}
        handleCdiRight = {handleCdiRight}
        handleBugLeft = {handleBugLeft}
        handleBugRight = {handleBugRight}
      />
      <Frame />
      <MovingMap 
        aircraftState = {aircraftState}
      />
    </div>
  )
}

export default App

