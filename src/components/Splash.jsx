import { Link } from "react-router-dom"

export default function Splash(props) {
  return (
    <div className="info--page">
      <h1>Quizzical</h1>
      <p>A trivia game built with React and the Open Trivia API</p>
      <Link to="/Game">
        <button className="btn--start">Start quiz</button>
      </Link>
    </div>
  )
}
