import Splash from "./components/Splash"
import Game from "./components/Game"
import About from "./components/About"
// our React Router elements
import { Link, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <nav>
        <ul className="nav--list">
          <Link className="nav--link nav--title" to="/">
            Quizzical
          </Link>
          <div>
            <Link className="nav--link" to="/Game">
              Game
            </Link>
            <Link className="nav--link" to="/About">
              About
            </Link>
          </div>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </main>
    </>
  )
}

export default App
