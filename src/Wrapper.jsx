import App from './App.jsx'
import Clouds from './components/Clouds.jsx'

export default function Wrapper() {
  return (
    <div className="wrapper">
      <Clouds />
      <App />
    </div>
  )
}
