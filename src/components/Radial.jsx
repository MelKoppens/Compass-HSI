import '../App.css'

export default function Radial(props) {
  const { aircraftState , instrumentState, obsState } = props;
  return (
    <div>
      <svg className="radial" width="520" height="500" viewBox={`${aircraftState.xPos + 290} ${aircraftState.yPos + 300} 520 500`} xmlns="http://www.w3.org/2000/svg">
        <image href="src/assets/Radial.svg" width="1100" height="1100"
        transform={`rotate(${-aircraftState.heading} ${aircraftState.xPos + 550} ${aircraftState.yPos + 550}) rotate(${obsState + instrumentState.toFrom} 550 550)`}
        />
      </svg>
    </div>
  )
}