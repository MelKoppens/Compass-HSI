import React, { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Controls from './components/Controls'
import Frame from './components/Frame'
import MovingMap from './components/MovingMap'
import './App.css'

let FPS = 10; // determines how fast states are updated 
let TURN_RATE = 3; // determine the turn rate (3 deg/sec is standard in aviation)
let SPEED = 120; // in KTS
function App() {

  const [headingState, setHeadingState] = useState(0);
  const [obsState, setObsState] = useState(30);
  const [cdiState, setCdiState] = useState(0);
  const [bugState, setBugState] = useState(0);
  const [turnState, setTurnState] = useState('right'); // 'left' , 'right' , 'level
  const [xPosState, setXPosState] = useState(256);
  const [yPosState, setYPosState] = useState(260);

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
  //   console.log('turnState: ' + turnState);
  // }, [turnState]);

  // Game loop for updating opponent positions, collisions, etc.
  useEffect(() => {
    let comp = document.querySelector('.compass');
    const gameLoop = setInterval(() => {
      // Update opponent positions, handle collisions, etc.

      // Handle turns when turning 
      setHeadingState((prevHeading) => {
        let newHeading;
        if (turnState === 'left') {
          newHeading = prevHeading + (TURN_RATE / FPS); // 3 refers to std rate of turn (3deg per sec)
        } else if (turnState === 'right') {
          newHeading = prevHeading - (TURN_RATE / FPS);
        } else {
          newHeading = prevHeading;
        }
        comp.style.transform = `rotate(${newHeading}deg)`;
        return newHeading;
      });

      // Handle forward movement
      setYPosState((prevYPos) => {
        let newYPos;
        newYPos = prevYPos - SPEED / ( FPS * 36 );
        return newYPos;
      });

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
        xPosState = {xPosState}
        yPosState = {yPosState}
      />
    </div>
  )
}

export default App

// ========================================================
// core game engine example :

// import React, { useState, useEffect } from 'react';

// const RacingGame = () => {
//   const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
//   const [opponents, setOpponents] = useState([]);
//   const [gameState, setGameState] = useState('start'); // 'start', 'running', 'paused', 'finished'
//   const [lap, setLap] = useState(1);
//   const [lapTimes, setLapTimes] = useState([]);
//   // Other state variables as needed

//   // Handle user input
//   const handleKeyPress = (event) => {
//     // Update player position, speed, direction, etc. based on user input
//   };

//   // Update game state based on laps, time, etc.
//   useEffect(() => {
//     if (gameState === 'running') {
//       // Update lap times, check for completion, etc.
//     }
//   }, [gameState]);

//   // Game loop for updating opponent positions, collisions, etc.
//   useEffect(() => {
//     const gameLoop = setInterval(() => {
//       // Update opponent positions, handle collisions, etc.
//     }, 1000 / 60); // 60 FPS
//     return () => clearInterval(gameLoop);
//   }, []);

//   return (
//     <div>
//       {/* Render game UI */}
//     </div>
//   );
// };

// export default RacingGame;
