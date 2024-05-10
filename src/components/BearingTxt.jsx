import '../App.css'

export default function BearingTxt(props) {
  const { aircraftState , instrumentState } = props;

  // turn bearing into displayable format
  let bearing = instrumentState.bearing;
  if (bearing > 359.5) bearing -= 360; // this is needed because Math.round(359.6) = 360
  const bearingString = Math.round(bearing).toString().padStart(3, '0');

  // compute GPS distance into displayable format
  let gpsDistance = 0.01 * Math.sqrt(Math.pow(aircraftState.xPos, 2) + Math.pow(aircraftState.yPos, 2));
  gpsDistance = gpsDistance.toFixed(1);
  
  return (
    <div className="bearingtxt">
      <div><span className="bearingtxt2" >{gpsDistance}</span><span className="bearingtxt4" >NM</span></div>
      <span className="bearingtxt2" >{bearingString}&deg;</span> TFD <span className="bearingtxt3" >NAV1&larr;</span>
    </div>
  )
}
