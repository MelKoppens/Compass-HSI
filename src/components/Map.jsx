import '../App.css';
import testMap2 from '../assets/TestMap2.svg';
import tfdVor from '../assets/TFD-VOR.svg';
import RadialImg from '../assets/Radial2.svg';
import Mini from '../assets/miniplane.svg';
export default function Map(props) {
  const { aircraftState , instrumentState, obsState, scaleState } = props;
  // building zoom feature
  return (
    <div>
      {/* 
      explanation of translation, rotation and scaling
      <svg className="vor" width="520" height="500" viewBox={`${aircraftState.xPos + .5width - xshift - .5viewboxwidth * scale} ${aircraftState.yPos + .5height - yshift - .5viewboxheight * scale} ${520 * scale} ${500 * scale}`} xmlns="http://www.w3.org/2000/svg">
        <image href={tfdVor} width="40" height="40" transform={`rotate(${-aircraftState.heading} ${aircraftState.xPos + .5width} ${aircraftState.yPos + .5height}) rotate(${aircraftState.heading} ${.5width + xshift} ${.5height + yshift})`}/>
      </svg> 
      */}

      {/* map */}
      <svg className="map" width="520" height="500" viewBox={`${aircraftState.xPos + 3050 - 260 * scaleState} ${aircraftState.yPos + 3050 - 250 * scaleState} ${520 * scaleState} ${500 * scaleState}`} xmlns="http://www.w3.org/2000/svg">
        <image href={testMap2} width="6100" height="6100" transform={`rotate(${-aircraftState.heading} ${aircraftState.xPos + 3050} ${aircraftState.yPos + 3050})`}/>
      </svg>

      {/* vor at (0, 0) */}
      <svg className="vor" width="520" height="500" viewBox={`${aircraftState.xPos / scaleState + 20 - 260} ${aircraftState.yPos / scaleState + 20 - 250} 520 500`} xmlns="http://www.w3.org/2000/svg">
        <image href={tfdVor} width="40" height="40" transform={`rotate(${-aircraftState.heading} ${aircraftState.xPos / scaleState + 20} ${aircraftState.yPos / scaleState + 20}) rotate(${aircraftState.heading} 20 20)`}/>
      </svg>

      {/* vor at (100, 200) */}
      {/* <svg className="vor" width="520" height="500" viewBox={`${(aircraftState.xPos - 100) / scaleState + 20 - 260} ${(aircraftState.yPos - 200) / scaleState + 20 - 250} 520 500`} xmlns="http://www.w3.org/2000/svg">
        <image href={tfdVor} width="40" height="40" transform={`rotate(${-aircraftState.heading} ${aircraftState.xPos / scaleState + 20} ${aircraftState.yPos / scaleState + 20}) rotate(${aircraftState.heading} ${20 + 100 / scaleState } ${20 + 200 / scaleState })`}/>
      </svg> */}

      {/* radial at (0, 0) */}
      <svg className="radial" width="520" height="500" viewBox={`${aircraftState.xPos / scaleState + 3050 - 260} ${aircraftState.yPos / scaleState + 3050 - 250} 520 500`} xmlns="http://www.w3.org/2000/svg">
        <image href={RadialImg} width="6100" height="6100"
        transform={`rotate(${-aircraftState.heading} ${aircraftState.xPos / scaleState + 3050} ${aircraftState.yPos / scaleState + 3050}) rotate(${obsState + instrumentState.toFrom} 3050 3050)`}
        />
      </svg>

      {/* miniplane */} 
      <svg className="miniplane" width="520" height="500" viewBox="-242 -234 520 500" xmlns="http://www.w3.org/2000/svg">
        <image href={Mini} width="40" height="38"  />
      </svg>
    </div>
  )
}
