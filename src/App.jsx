import React, { useState, useEffect } from 'react'
import Controls from './components/Controls'
import Frame from './components/Frame'
import MovingMap from './components/MovingMap'
import './App.css'

let FPS = 5; // determines how fast states are updated 
let TURN_RATE = 3; // determine the turn rate (3 deg/sec is standard in aviation)
let SPEED = 120; // in KTS

function App() {
  const [aircraftState, setAircraftState] = useState({heading: 0, xPos: 0, yPos: 200}); // [0,360], x, y
  const [instrumentState, setInstrumentState] = useState({bearing: 0, cdi: 0, toFrom: 'to'}); // [0,360], [-10,10], 'to', 'from'
  const [cdiState, setCdiState] = useState(0);
  const [obsState, setObsState] = useState(0);
  const [bugState, setBugState] = useState(0);
  const [turnState, setTurnState] = useState('level'); // 'left' , 'right' , 'level'
  const [headingModeState, setHeadingModeState] = useState('off');

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

  // handle heading mode
  const handleHeadingMode = () => {
    let divHeadingMode = document.querySelector('.heading-mode');
    // Toggle headingMode on/off
    if (headingModeState === 'off') {
      setHeadingModeState('on');
      divHeadingMode.style.backgroundColor = 'DodgerBlue';
    } 
    if (headingModeState === 'on') {
      setHeadingModeState('off');
      divHeadingMode.style.backgroundColor = 'skyblue';
    } 
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

  // handle cdi left input (this function is not being used since button is disabled)
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

  // handle cdi right input (this function is not being used since button is disabled)
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
  useEffect(() => {
    console.log(headingModeState);
  }, [headingModeState]);

  // Game loop for updating opponent positions, collisions, etc.
  useEffect(() => {
    let comp = document.querySelector('.compass');
    const gameLoop = setInterval(() => {
      // Update opponent positions, handle collisions, etc.

      // Handle aircraft movement
      setAircraftState((prevAircraftState) => {
        console.log(prevAircraftState);
        // if heading mode is on, do this
        if (headingModeState === 'on') {
          let newTurn = (bugState - aircraftState.heading ) % 360;
          // turn it into a value between -180 and 180
          if (newTurn < -180) newTurn += 360;
          if (newTurn > 180) newTurn -= 360;

          if (newTurn > TURN_RATE / FPS) setTurnState('right');
          else if (newTurn < -TURN_RATE / FPS) setTurnState('left');
          else setTurnState('level');
        }
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

      // Handle instrument updates (except heading)
      setInstrumentState(() => {
        
        // update bearing
        let divBearing = document.querySelector('.bearing');
        let newBearing;
        if (aircraftState.yPos > 0) {
          newBearing = - Math.atan(aircraftState.xPos / aircraftState.yPos) * 180 / Math.PI;
        } else {
          newBearing = 180 - Math.atan(aircraftState.xPos / aircraftState.yPos) * 180 / Math.PI;
        };
        divBearing.style.transform = `rotate(${newBearing}deg)`;
        
        // update CDI
        let divCdi = document.querySelector('.cdi');
        // take the relative diff between bearing and OBS mod 360
        let newCdi = (newBearing - obsState) % 360;
        // turn it into a value between -90 and 90
        if (newCdi < 0) newCdi += 360;
        if (newCdi > 90 && newCdi <= 270) newCdi = 180 - newCdi;
        else if (newCdi > 270) newCdi = newCdi - 360;
        // modulate cdi to not exceed 10 or -10
        if (newCdi > 10) newCdi = 10;
        if (newCdi < -10) newCdi = -10;
        divCdi.style.left = `${2.5 * newCdi}%`;

        // update TO/FROM
        let divToFrom = document.querySelector('.tofrom');
        let newToFrom;
        // take inproduct of obsState and the position of the aircraft relative to the VOR
        // (or you could compare obsState with bearing as an alternative)
        let inProduct = Math.sin(obsState * Math.PI / 180) * aircraftState.xPos - // (minus) because y-axis is reversed
                        Math.cos(obsState * Math.PI / 180) * aircraftState.yPos;
        if (inProduct <= 0 ) {
          // when the inProduct is negative, display TO
          divToFrom.style.transform = `rotate(0deg)`;
          newToFrom = 'to';
        } else {
          // when the inProduct is positive, display FROM
          divToFrom.style.transform = `rotate(180deg)`;
          newToFrom = 'from';
        }

        let newAircraftState = {
          bearing: newBearing,
          cdi: newCdi,
          toFrom: newToFrom,
        }

        return newAircraftState;  
      });

    }, 1000 / FPS);
    return () => clearInterval(gameLoop);
  }, [aircraftState, instrumentState]);

  // const [count, setCount] = useState(0)

  return (
    <div>
      <Controls 
        handleTurnLeft = {handleTurnLeft}
        handleTurnLevel = {handleTurnLevel}
        handleTurnRight = {handleTurnRight}
        handleHeadingMode = {handleHeadingMode}
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

