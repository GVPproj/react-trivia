import Splash from "./components/Splash"
import Game from "./components/Game"
import About from "./components/About"
import { Link, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/Game">Game</Link>
          <Link to="/About">About</Link>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </>
  )
}

export default App
