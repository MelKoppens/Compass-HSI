import '../App.css'

export default function Compass() {
  return (
    <main>
      <div className="compass">
        <div className="hsi">
          <div className="course"></div>
          <div className="cdi"></div>
        </div>
        <div className="bearing"></div>
        <div className="bug"></div>
      </div>
    </main>
  )
}
