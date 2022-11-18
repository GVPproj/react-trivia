import { Link } from "react-router-dom"

export default function Splash(props) {
  return (
    <div className="splash-page">
      <h1>Quizzical</h1>
      <h3>Some description if needed</h3>
      <Link to="/Game">
        <button>Start quiz</button>
      </Link>
    </div>
  )
}
