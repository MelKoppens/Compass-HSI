import '../App.css'

export default function HeadingTxt(props) {
  const { aircraftState } = props;
  let heading = aircraftState.heading;
  if (heading > 359.5) heading -= 360; // this is needed because Math.round(359.6) = 360
  const headingString = Math.round(heading).toString().padStart(3, '0');
  return (
    <div className="hdgtxt">
      {headingString}&deg;
    </div>
  )
}
