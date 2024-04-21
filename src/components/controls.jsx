import '../App.css'

export default function Controls(props) {
  const { handleObsLeft, handleObsRight } = props;
  return (
    <nav>
      <button>turn left</button>
      <button>turn right</button>
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
      <button>HDG left</button>
      <button>HDG right</button>
    </nav>
  )
}