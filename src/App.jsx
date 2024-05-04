import React, { useState, useEffect } from 'react'
import Controls from './components/Controls'
import Frame from './components/Frame'
import MovingMap from './components/MovingMap'
import './App.css'

let FPS = 20; // determines how fast states are updated 
let TURN_RATE = 3; // determine the turn rate (3 deg/sec is standard in aviation)
let SPEED = 120; // in KTS

function App() {
  const [aircraftState, setAircraftState] = useState({heading: 0, xPos: 0, yPos: 200}); // [0,360], x, y
  const [instrumentState, setInstrumentState] = useState({bearing: 0, cdi: 0, toFrom: 0}); // [0,360], [-10,10], 'to', 'from'
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
    let buttons = document.querySelectorAll('.turn');
    // Toggle headingMode on/off
    if (headingModeState === 'off') {
      setHeadingModeState('on');
      divHeadingMode.style.backgroundColor = 'DodgerBlue';
      buttons.forEach(button => {
        button.style.backgroundColor = 'lightgrey';
        // turn off hover behavior
        button.classList.add('no-hover');
      });
    } 
    if (headingModeState === 'on') {
      setHeadingModeState('off');
      divHeadingMode.style.backgroundColor = 'skyblue';
      buttons.forEach(button => {
        button.style.backgroundColor = 'skyblue';
        // turn on hover behavior
        button.classList.remove('no-hover');
      });
    } 
  };
  
  // handle obs left input
  const handleObsLeft = () => {
    // Turn OBS 1 degree left
    let div = document.querySelector('.hsi');
    setObsState((prevObs) => {
      let newObs = prevObs - 1;
      if (newObs < 0) newObs += 360;
      div.style.transform = `rotate(${newObs}deg)`;
      return newObs;
    })
  };

   // handle obs push
   const handleObs = () => {
    // Center the OBS TO the station
    let div = document.querySelector('.hsi');
    setObsState(() => {
      let newObs = Math.round(instrumentState.bearing);
      if (newObs === 360) newObs = 0;
      div.style.transform = `rotate(${newObs}deg)`;
      return newObs;
    })
  };

  // handle obs right input
  const handleObsRight = () => {
    // Turn OBS 1 degree right
    let div = document.querySelector('.hsi');
    setObsState((prevObs) => {
      let newObs = prevObs + 1;
      if (newObs >= 360) newObs -= 360;
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
      let newBug = prevBug - 1;
      if (newBug < 0) newBug += 360;
      div.style.transform = `rotate(${newBug}deg)`;
      return newBug;
    })
  };

  // handle hdg bug push
  const handleBug = () => {
    // Center the HDG bug on current heading
    let div = document.querySelector('.bug');
    setBugState(() => {
      const newBug = Math.round(aircraftState.heading);
      div.style.transform = `rotate(${newBug}deg)`;
      return newBug;
    })
  };

  // handle hdg bug right input
  const handleBugRight = () => {
    // Turn BUG 1 degree right
    let div = document.querySelector('.bug');
    setBugState((prevBug) => {
      let newBug = prevBug + 1;
      if (newBug >= 360) newBug -= 360;
      div.style.transform = `rotate(${newBug}deg)`;
      return newBug;
    })
  };

  // // module to test states
  // useEffect(() => {
  //   console.log(bugState);
  // }, [bugState]);

  // Movement loop
  useEffect(() => {
    let comp = document.querySelector('.compass');
    const gameLoop = setInterval(() => {

      // Handle aircraft movement
      setAircraftState((prevAircraftState) => {

        // console.log(prevAircraftState);
        let newHeading;
        let newTurn = (bugState - aircraftState.heading ) % 360;
        // turn it into a value between -180 and 180
        if (newTurn < -180) newTurn += 360;
        if (newTurn > 180) newTurn -= 360;

        // if heading mode is on, do this
        if (headingModeState === 'on') {
          // this solution still needs work
          if (newTurn > 1.1 * TURN_RATE / FPS) setTurnState('right');
          else if (newTurn < -1.1 * TURN_RATE / FPS) setTurnState('left');
          else {
            // newHeading = bugState;
            setTurnState('level');
          } 
        }
        if (turnState === 'left') {
          newHeading = prevAircraftState.heading - (TURN_RATE / FPS); // 3 refers to std rate of turn (3deg per sec)
          if (newHeading < 0) newHeading += 360;
        } else if (turnState === 'right') {
          newHeading = prevAircraftState.heading + (TURN_RATE / FPS);
          if (newHeading >= 360) newHeading -= 360;
        } else {
          newHeading = prevAircraftState.heading;
          if (headingModeState === 'on' && Math.abs(newTurn) <= TURN_RATE / FPS) newHeading = bugState;
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
          if (newBearing < 0) newBearing += 360;
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
        let newToFrom = 0; // 'TO' indication
        // take inproduct of obsState and the position of the aircraft relative to the VOR
        // (or you could compare obsState with bearing as an alternative)
        let inProduct = Math.sin(obsState * Math.PI / 180) * aircraftState.xPos - // (minus) because y-axis is reversed
                        Math.cos(obsState * Math.PI / 180) * aircraftState.yPos;
        if (inProduct > 0 ) newToFrom = 180; // 'FROM' indication
        divToFrom.style.transform = `rotate(${newToFrom}deg)`;

        let newInstrumentState = {
          bearing: newBearing,
          cdi: newCdi,
          toFrom: newToFrom,
        }

        return newInstrumentState;  
      });

    }, 1000 / FPS);
    return () => clearInterval(gameLoop);
  }, [aircraftState, instrumentState]);

  return (
    <div className="app">
      <Controls 
        handleTurnLeft = {handleTurnLeft}
        handleTurnLevel = {handleTurnLevel}
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
      />
    </div>
  )
}

export default App

