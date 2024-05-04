
// snipet from controls.jsx
</nav>
<nav className="navbar">
  <div className="cdibox"> 
    <button ref={obsLeftButton} onClick={handleObsLeft} className="obs-left">L</button>
    <button onClick={handleObs} className="obs">OBS</button>
    <button ref={obsRightButton} onClick={handleObsRight} className="obs-right">R</button>
  </div>
  {/* <button ref={cdiLeftButton} onClick={handleCdiLeft} className="cdi-left">CDI left</button> */}
  {/* <button ref={cdiRightButton} onClick={handleCdiRight} className="cdi-right">CDI right</button> */}
  <div className="hdgbox"> 
    <button ref={bugLeftButton} onClick={handleBugLeft} className="bug-left"></button>
    <button onClick={handleBug} className="hdgbug">H</button>
    <button ref={bugRightButton} onClick={handleBugRight} className="bug-right"></button>
  </div>
</nav>

// snipet from index.css
.hdgbox {
  position: relative;
}

.bug-left {
  position: absolute;
  top: 2px;
  left: 0px;
  z-index: 1;
  background: url('./assets/LeftButton.svg') no-repeat center center;
  /* background-size: contain; */
  width: 30px; 
  height: 36px; 
  /* border: none;  */
  /* text-indent: -9999px; */
}

.hdgbug {
  position: absolute;
  top: 0px;
  left: 25px;
  z-index: 2;
  background: url('./assets/CenterButton.svg') no-repeat center center;
  /* background-size: contain; */
  width: 40px; 
  height: 40px; 
  /* border: none;  */
  /* text-indent: -9999px; */
}

.bug-right {
  position: absolute;
  top: 2px;
  left: 50px;
  z-index: 1;
  background: url('./assets/RightButton.svg') no-repeat center center;
  /* background-size: contain; */
  width: 30px; 
  height: 36px; 
  /* border: none;  */
  /* text-indent: -9999px; */
}

// how to deploy the vite built project on GitHub pages