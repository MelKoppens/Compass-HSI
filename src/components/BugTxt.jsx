import '../App.css'

export default function BugTxt(props) {
  const { bugState } = props;
  const bugString = bugState.toString().padStart(3, '0');
  return (
    <div className="bugtxt">
      HDG <span className="bugtxt2" >{bugString}&deg;</span>
    </div>
  )
}
