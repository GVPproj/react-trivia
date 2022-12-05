import Splash from "./components/Splash"
import Game from "./components/Game"
import About from "./components/About"

// our React Router elements
import { Link, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <nav className="flex">
        <ul className="flex nav--list">
          <Link className="nav--link" to="/">
            Quizzical
          </Link>
          <Link className="nav--link" to="/About">
            About
          </Link>
        </ul>
      </nav>
      <main className="flex">
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
