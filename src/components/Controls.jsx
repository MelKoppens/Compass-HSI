import '../App.css'
import React, { useRef, useEffect } from 'react';
import  createActionButtonHandler from './helpers/fastclick';


export default function Controls(props) {
  const { 
    handleTurnLeft,
    handleLevel,
    handleTurnRight,
    handleHeadingMode,
    handleObsLeft,
    handleObs,
    handleObsRight,
    handleCdiLeft,
    handleCdiRight,
    handleBugLeft,
    handleBug,
    handleBugRight,
    handlePause
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
  
  return (
    <nav>
      <nav className='navbar1'>
        <div className='stearbox'>
          <button 
            className="turn-left"
            style={{borderRadius: '25px 5px 5px 25px'}}
            onClick={handleTurnLeft}
            >&lt;
          </button>
          <button 
            className="level"
            style={{borderRadius: '5px', backgroundColor: '#3F8320'}} 
            onClick={handleLevel}
            >LVL
          </button>
          <button 
            className="turn-right"
            style={{borderRadius: '5px 25px 25px 5px'}}
            onClick={handleTurnRight}
            >&gt;
          </button>
        </div>
        <button 
          className="pause"
          style={{width: '55px', borderRadius: '25px 25px 25px 25px'}}
          onClick={handlePause}
          >{'\u23F8'}
        </button>
      </nav>
      <nav className='navbar2'>
        <div className='hdgbox'>
          <button ref={bugLeftButton} style={{borderRadius: '25px 5px 5px 25px'}} onClick={handleBugLeft} className="bug-left">&lt;</button>
          <button onClick={handleBug} style={{borderRadius: '5px'}}  className="hdgbug">HDG</button>
          <button ref={bugRightButton} style={{borderRadius: '5px 25px 25px 5px'}} onClick={handleBugRight} className="bug-right">&gt;</button>
        </div>
        {/* <button ref={cdiLeftButton} onClick={handleCdiLeft} className="cdi-left">CDI left</button> */}
        {/* <button ref={cdiRightButton} onClick={handleCdiRight} className="cdi-right">CDI right</button> */}
        <button 
          className="heading-mode" 
          onClick={handleHeadingMode}
          >HM
        </button>
        <div className='obsbox'>
          <button ref={obsLeftButton} style={{borderRadius: '25px 5px 5px 25px'}} onClick={handleObsLeft} className="obs-left">&lt;</button>
          <button onClick={handleObs} style={{borderRadius: '5px'}} className="obs">OBS</button>
          <button ref={obsRightButton} style={{borderRadius: '5px 25px 25px 5px'}} onClick={handleObsRight} className="obs-right">&gt;</button>
        </div>
      </nav>
    </nav>
  )
}
