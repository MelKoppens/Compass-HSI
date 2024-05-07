import '../App.css';
import testMap from '../assets/Testmap.svg';
import tfdVor from '../assets/TFD-VOR.svg';
import RadialImg from '../assets/Radial.svg';
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
      <svg className="map" width="520" height="500" viewBox={`${aircraftState.xPos + 550 - 260 * scaleState} ${aircraftState.yPos + 550 - 250 * scaleState} ${520 * scaleState} ${500 * scaleState}`} xmlns="http://www.w3.org/2000/svg">
        <image href={testMap} width="1100" height="1100" transform={`rotate(${-aircraftState.heading} ${aircraftState.xPos + 550} ${aircraftState.yPos + 550})`}/>
      </svg>

      {/* vor at (0, 0) */}
      <svg className="vor" width="520" height="500" viewBox={`${aircraftState.xPos + 20 - 260 * scaleState} ${aircraftState.yPos + 20 - 250 * scaleState} ${520 * scaleState} ${500 * scaleState}`} xmlns="http://www.w3.org/2000/svg">
        <image href={tfdVor} width="40" height="40" transform={`rotate(${-aircraftState.heading} ${aircraftState.xPos + 20} ${aircraftState.yPos + 20}) rotate(${aircraftState.heading} 20 20)`}/>
      </svg>

      {/* vor at (100, 200) */}
      {/* <svg className="vor" width="520" height="500" viewBox={`${aircraftState.xPos + 20 - 100 - 260 * scaleState} ${aircraftState.yPos + 20 - 200 - 250 * scaleState} ${520 * scaleState} ${500 * scaleState}`} xmlns="http://www.w3.org/2000/svg">
        <image href={tfdVor} width="40" height="40" transform={`rotate(${-aircraftState.heading} ${aircraftState.xPos + 20} ${aircraftState.yPos + 20}) rotate(${aircraftState.heading} ${20+100} ${20+200})`}/>
      </svg> */}

      {/* radial at (0, 0) */}
      <svg className="radial" width="520" height="500" viewBox={`${aircraftState.xPos / scaleState + 290} ${aircraftState.yPos / scaleState + 300} 520 500`} xmlns="http://www.w3.org/2000/svg">
        <image href={RadialImg} width="1100" height="1100"
        transform={`rotate(${-aircraftState.heading} ${aircraftState.xPos / scaleState + 550} ${aircraftState.yPos / scaleState + 550}) rotate(${obsState + instrumentState.toFrom} 550 550)`}
        />
      </svg>

      {/* miniplane */} 
      <svg className="miniplane" width="520" height="500" viewBox="-242 -234 520 500" xmlns="http://www.w3.org/2000/svg">
        <image href={Mini} width="40" height="38"  />
      </svg>
    </div>
  )
}
