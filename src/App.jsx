import React, { useState, useEffect } from 'react'
import Controls from './components/Controls'
import Frame from './components/Frame'
import MovingMap from './components/MovingMap'
import './App.css'

const FPS = 20; // determines how fast states are updated 
const TURN_RATE = 3; // determine the turn rate (3 deg/sec is standard in aviation)
const SPEED = 120; // in KTS
const ZOOMFACTOR = 1.05; // rate of zooming in/out

function App() {
  const [aircraftState, setAircraftState] = useState({heading: 0, xPos: 0, yPos: 200}); // [0,360], x, y
  const [instrumentState, setInstrumentState] = useState({bearing: 0, cdi: 0, toFrom: 0}); // [0,360], [-10,10], [0, 180], ['left', 'right']
  const [cdiState, setCdiState] = useState(0);
  const [obsState, setObsState] = useState(0);
  const [bugState, setBugState] = useState(0);
  const [turnState, setTurnState] = useState('level'); // 'left' , 'right' , 'level'
  const [headingModeState, setHeadingModeState] = useState('off');
  const [scaleState, setScaleState] = useState(1);
  const [pauseState, setPauseState] = useState(false); // pauses the app

  // handle left turn
  const handleTurnLeft = () => {
    // Set turnState to left
    let divTurnLeft = document.querySelector('.turn-left');
    let divLevel = document.querySelector('.level');
    let divTurnRight = document.querySelector('.turn-right');
    setTurnState('left');
    divTurnLeft.style.backgroundColor = '#3F8320';
    divLevel.style.backgroundColor = '#4FA43F';
    divTurnRight.style.backgroundColor = '#4FA43F';
  };

  // handle level
  const handleTurnLevel = () => {
    // Set turnState to left
    let divTurnLeft = document.querySelector('.turn-left');
    let divLevel = document.querySelector('.level');
    let divTurnRight = document.querySelector('.turn-right');
    setTurnState('level');
    divTurnLeft.style.backgroundColor = '#4FA43F';
    divLevel.style.backgroundColor = '#3F8320';
    divTurnRight.style.backgroundColor = '#4FA43F';

  };

  // handle right turn
  const handleTurnRight = () => {
    // Set turnState to left
    let divTurnLeft = document.querySelector('.turn-left');
    let divLevel = document.querySelector('.level');
    let divTurnRight = document.querySelector('.turn-right');
    setTurnState('right');
    divTurnLeft.style.backgroundColor = '#4FA43F';
    divLevel.style.backgroundColor = '#4FA43F';
    divTurnRight.style.backgroundColor = '#3F8320';
  };

  // handle heading mode
  const handleHeadingMode = () => {
    let divHeadingMode = document.querySelector('.heading-mode');
    let divTurnLeft = document.querySelector('.turn-left');
    let divLevel = document.querySelector('.level');
    let divTurnRight = document.querySelector('.turn-right');
    // Toggle headingMode on/off
    if (headingModeState === 'off') {
      setHeadingModeState('on');
      divHeadingMode.style.backgroundColor = '#3F8320';
      divTurnLeft.style.backgroundColor = 'lightgrey';
      divLevel.style.backgroundColor = 'lightgrey';
      divTurnRight.style.backgroundColor = 'lightgrey';
      // turn off hover behavior
      divTurnLeft.classList.add('no-hover');
    } 
    if (headingModeState === 'on') {
      setHeadingModeState('off');
      divHeadingMode.style.backgroundColor = '#4FA43F';
      divTurnLeft.style.backgroundColor = (turnState === 'left') ? '#3F8320' : '#4FA43F';
      divLevel.style.backgroundColor = (turnState === 'level') ? '#3F8320' : '#4FA43F';
      divTurnRight.style.backgroundColor = (turnState === 'right') ? '#3F8320' : '#4FA43F';
      // turn on hover behavior
      divTurnLeft.classList.remove('no-hover');
    } 
  };

    // handle pause
    const handlePause = () => {
      let divPause = document.querySelector('.pause');
      let clouds = [];
      for (let i = 0; i < 6; i++) {
        clouds.push(document.querySelector(`.clouds${i}`));
      }
      // Toggle pause on/off
      if (!pauseState) {
        setPauseState(true);
        divPause.style.backgroundColor = '#3F8320';
        divPause.innerHTML = '\u23F5';
        for (let i = 0; i < 6; i++) {
          clouds[i].style.animationPlayState = 'paused';
        }
      } 
      if (pauseState) {
        setPauseState(false);
        divPause.style.backgroundColor = '#4FA43F';
        divPause.innerHTML = '\u23F8';
        for (let i = 0; i < 6; i++) {
          clouds[i].style.animationPlayState = 'running';
        }
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
      if (prevCdi > -10) {
        newCdi = prevCdi - 1;
      } else {
        newCdi = prevCdi;
      }
      div.style.left = `${2.5 * newCdi}%`;
      return newCdi;
    })
  };

  // handle cdi right input (this function is not being used since button is disabled)
  const handleCdiRight = () => {
    // Turn CDI .4 degree right, limit 10 deg (not possible directly in an AC)
    let div = document.querySelector('.cdi');
    setCdiState((prevCdi) => {
      let newCdi;
      if (prevCdi < 10) {
        newCdi = prevCdi + 1;
      } else {
        newCdi = prevCdi;
      }
      div.style.left = `${2.5 * newCdi}%`;
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

  // Zoom in with zoomfactor
  const handleZoomIn = () => {
    setScaleState((prevScale) => {
      return prevScale > 0.01 ? prevScale / ZOOMFACTOR : prevScale;
    })
  };

  // Zoom out with zoomfactor
  const handleZoomOut = () => {
    setScaleState((prevScale) => {
      return prevScale < 100 ? prevScale * ZOOMFACTOR : prevScale;
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
        // update the heading
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

        // update the position based on 100px = 1NM
        let newXPos = prevAircraftState.xPos + Math.sin(newHeading * Math.PI / 180) * SPEED / ( FPS * 36 );
        let newYPos = prevAircraftState.yPos - Math.cos(newHeading * Math.PI / 180) * SPEED / ( FPS * 36 );

        // return updated aircraft state
        let newAircraftState = {
          heading: newHeading,
          xPos: newXPos,
          yPos: newYPos
        }
        return pauseState ? prevAircraftState : newAircraftState;
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

        // update VOR1 text position based on CDI position
        let divVor1Txt = document.querySelector('.vor1txt');
        if (instrumentState.cdi < -1.5) divVor1Txt.style.left = '210px';
        if (instrumentState.cdi > 1.5) divVor1Txt.style.left = '110px';

        // return updated instrument state
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

export default App

