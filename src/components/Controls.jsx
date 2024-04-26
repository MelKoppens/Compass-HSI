import React, { useRef, useEffect } from 'react';
import '../App.css'
import  createActionButtonHandler from './helpers/fastclick';


export default function Controls(props) {
  const { 
    handleTurnLeft,
    handleTurnLevel,
    handleTurnRight,
    handleHeadingMode,
    handleObsLeft,
    handleObs,
    handleObsRight,
    handleCdiLeft,
    handleCdiRight,
    handleBugLeft,
    handleBug,
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

  // fast button for the left CDI button
  const cdiLeftButton = useRef(null);
  useEffect(() => {
    if (cdiLeftButton.current) {
      createActionButtonHandler(cdiLeftButton.current, handleCdiLeft);
    }
  }, []);

  // fast button for the right CDI button
  const cdiRightButton = useRef(null);
  useEffect(() => {
    if (cdiRightButton.current) {
      createActionButtonHandler(cdiRightButton.current, handleCdiRight);
    }
  }, []);

  // fast button for the left HDG button
  const bugLeftButton = useRef(null);
  useEffect(() => {
    if (bugLeftButton.current) {
      createActionButtonHandler(bugLeftButton.current, handleBugLeft);
    }
  }, []);

   // fast button for the right HDG button
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
    <nav className='navbar1'>
      <div className='stearbox'>
        <button 
          className="turn-left" 
          onClick={handleTurnLeft}
          >L
        </button>-
        <button 
          className="turn-level" 
          onClick={handleTurnLevel}
          >LVL
        </button>-
        <button 
          className="turn-right" 
          onClick={handleTurnRight}
          >R
        </button>
      </div>

    </nav>
    <nav className='navbar2'>
      <div className='hdgbox'>
        <button ref={obsLeftButton} onClick={handleObsLeft} className="obs-left">L</button>-
        <button onClick={handleObs} className="obs">OBS</button>-
        <button ref={obsRightButton} onClick={handleObsRight} className="obs-right">R</button>
      </div>
      {/* <button ref={cdiLeftButton} onClick={handleCdiLeft} className="cdi-left">CDI left</button> */}
      {/* <button ref={cdiRightButton} onClick={handleCdiRight} className="cdi-right">CDI right</button> */}
      <button 
        className="heading-mode" 
        onClick={handleHeadingMode}
        >HM
      </button>
      <div className='hdgbox'>
        <button ref={bugLeftButton} onClick={handleBugLeft} className="bug-left">L</button>-
        <button onClick={handleBug} className="hdgbug">HDG</button>-
        <button ref={bugRightButton} onClick={handleBugRight} className="bug-right">R</button>
      </div>
    </nav>
    </>
  )
}
