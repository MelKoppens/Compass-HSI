import '../App.css';
import React, { useRef, useEffect } from 'react';
import  createActionButtonHandler from './helpers/fastclick';

export default function ZoomControls(props) {
  const { handleZoomIn, handleZoomOut, scaleState } = props;

    // fast button for the zoom in button
    const zoomInButton = useRef(null);
    useEffect(() => {
      if (zoomInButton.current) {
        createActionButtonHandler(zoomInButton.current, handleZoomIn);
      }
    }, []);
  
    // fast button for the zoom out button
    const zoomOutButton = useRef(null);
    useEffect(() => {
      if (zoomOutButton.current) {
        createActionButtonHandler(zoomOutButton.current, handleZoomOut);
      }
    }, []);
  return (
    <div className="zoombox">
      <button 
        ref={zoomInButton}
        className="zoom"
        style={{width: '25px', height: '30px', padding: '3px', borderRadius: '25px 5px 5px 25px'}}
        onClick={handleZoomIn}
        >-
      </button>
      <button 
        ref={zoomOutButton}
        className="zoom"
        style={{width: '25px', height: '30px', padding: '3px', borderRadius: '5px 25px 25px 5px'}}
        onClick={handleZoomOut}
        >+
      </button>
      <div>{scaleState.toFixed(2)}</div>
    </div>
  )
}
