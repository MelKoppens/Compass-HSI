import React, { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Controls from './components/Controls'
import Main from './components/Main'
import './App.css'

// determines how fast states are updated, turns will be std rate regardless
let FPS = 10;

function App() {

  const [headingState, setHeadingState] = useState(0);
  const [obsState, setObsState] = useState(0);

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
  
  // Game loop for updating opponent positions, collisions, etc.
  useEffect(() => {
    let div = document.querySelector('.compass');
    const gameLoop = setInterval(() => {
      // Update opponent positions, handle collisions, etc.

      // Infinite std rate turn to the left 
      setHeadingState((prevHeading) => {
        const newHeading = prevHeading + (3 / FPS); // 3 refers to std rate of turn (3deg per sec)
        div.style.transform = `rotate(${newHeading}deg)`;
        return newHeading;
      });

    }, 1000 / FPS);
    return () => clearInterval(gameLoop);
  }, []);

  // useEffect(() => {
  //   console.log('headingState: ' + headingState);
  // }, [headingState]);


  // const [count, setCount] = useState(0)

  return (
    <>
      <Controls 
        handleObsLeft = {handleObsLeft}
        handleObsRight = {handleObsRight}
      />
      <Main />
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App


// game engine example core:

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
