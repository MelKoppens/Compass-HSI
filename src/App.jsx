import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Controls from './components/controls.jsx'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  // // Get the div element
  // var div = document.querySelector('.compass');

  // // Set initial rotation angle
  // var angle = 0;
  
  // // Function to rotate the div
  // function rotateDiv() {
  //   // Increment the angle
  //   angle += .3;
  //   // Apply rotation to the div
  //   div.style.transform = 'rotate(' + angle + 'deg)';
  //   // Call the function again after a short delay
  //   setTimeout(rotateDiv, 100);
  // }

  // // Call the rotateDiv function to start the rotation
  // rotateDiv();

  return (
    <>
      <Controls />
      <main>
        <div className="compass">
          <div className="hsi">
            <div className="selector">SEL</div>
            <div className="cdi">CDI</div>
          </div>
        </div>
      </main>
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
