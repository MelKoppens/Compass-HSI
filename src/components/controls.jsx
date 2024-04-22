import React, { useRef, useEffect } from 'react';
import '../App.css'
import  createActionButtonHandler from './helpers/fastclick';


export default function Controls(props) {
  const { 
    handleTurnLeft,
    handleTurnLevel,
    handleTurnRight,
    handleObsLeft,
    handleObsRight,
    handleBugLeft,
    handleBugRight
  } = props;

  // fast button for the left OBS button
  const obsLeftButton = useRef(null);
  useEffect(() => {
    if (obsLeftButton.current) {
      createActionButtonHandler(obsLeftButton.current, handleObsLeft);
    }
  }, []);

  // fast button for the right OBS button
  const obsRightButton = useRef(null);
  useEffect(() => {
    if (obsRightButton.current) {
      createActionButtonHandler(obsRightButton.current, handleObsRight);
    }
  }, []);

  // fast button for the left BUG button
  const bugLeftButton = useRef(null);
  useEffect(() => {
    if (bugLeftButton.current) {
      createActionButtonHandler(bugLeftButton.current, handleBugLeft);
    }
  }, []);

   // fast button for the right BUG button
  const bugRightButton = useRef(null);
  useEffect(() => {
    if (bugRightButton.current) {
      createActionButtonHandler(bugRightButton.current, handleBugRight);
    }
  }, []);
  

  // Usage:
  // const actionButton = document.getElementById('obsLeft');
  // console.log(actionButton + "*****");
  // const performAction = createActionButtonHandler(actionButton);
  
  return (
    <>
    <div>(click)</div>
    <nav className='navbar'>
      <button 
        className="turn-left" 
        onClick={handleTurnLeft}
        >TURN left
      </button>
      <button 
        className="turn-level" 
        onClick={handleTurnLevel}
        >LEVEL
      </button>
      <button 
        className="turn-right" 
        onClick={handleTurnRight}
        >TURN right
      </button>
    </nav>
    <nav className='navbar'>
      <button ref={obsLeftButton} onClick={handleObsLeft} className="obs-left">OBS left</button>
      <button ref={obsRightButton} onClick={handleObsRight} className="obs-right">OBS right</button>
      <button ref={bugLeftButton} onClick={handleBugLeft} className="bug-left">BUG left</button>
      <button ref={bugRightButton} onClick={handleBugRight} className="bug-right">BUG right</button>
    </nav>
    <div>(click or hold)</div>
    </>
  )
}