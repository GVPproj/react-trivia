import { Link } from "react-router-dom"

export default function Splash(props) {
  return (
    <div className="info--page">
      <h1>Quizzical</h1>
      <h3>A trivia game built with React and the Open Trivia API</h3>
      <Link to="/Game">
        <button className="btn--start">Start quiz</button>
      </Link>
    </div>
  )
}
