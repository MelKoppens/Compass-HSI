import '../App.css'

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

  return (
    <>
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
    <nav>
      <button 
        className="obs-left" 
        onClick={handleObsLeft}
        >OBS left
      </button>
      <button 
        className="obs-right" 
        onClick={handleObsRight}
        >OBS right
      </button>
      <button 
        className="bug-left" 
        onClick={handleBugLeft}
        >BUG left
      </button>
      <button 
        className="bug-right" 
        onClick={handleBugRight}
        >BUG right
      </button>
    </nav>
    </>
  )
}