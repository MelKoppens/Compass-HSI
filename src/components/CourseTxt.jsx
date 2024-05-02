import '../App.css'

export default function CourseTxt(props) {
  const { obsState } = props;
  const courseString = obsState.toString().padStart(3, '0');
  return (
    <div className="coursetxt">
      CRS <span className="coursetxt2" >{courseString}&deg;</span>
    </div>
  )
}
