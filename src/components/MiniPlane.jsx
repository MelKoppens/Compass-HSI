import '../App.css';
import Mini from '../assets/miniplane.svg';

export default function MiniPlane() {
  return (
    <div>
      <svg className="miniplane" width="520" height="500" viewBox="-242 -234 520 500" xmlns="http://www.w3.org/2000/svg">
        <image href={Mini} width="40" height="38"  />
      </svg>
    </div>
  )
}
