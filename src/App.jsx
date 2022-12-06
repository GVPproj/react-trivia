import Splash from "./components/Splash"
import Game from "./components/Game"
import About from "./components/About"

// our React Router elements
import { NavLink, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <nav className="flex">
        <ul className="flex nav--list">
          <NavLink
            className="nav--link"
            to="/"
            // style={({ isActive }) => ({
            //   fontWeight: isActive ? "700" : "200",
            // })}
          >
            Quizzical
          </NavLink>
          <div className="flex nav--choices">
            <NavLink
              className="nav--link"
              to="/Game"
              style={({ isActive }) => ({
                fontWeight: isActive ? "700" : "200",
              })}
            >
              Game
            </NavLink>
            <NavLink
              className="nav--link"
              to="/About"
              style={({ isActive }) => ({
                fontWeight: isActive ? "700" : "200",
              })}
            >
              About
            </NavLink>
          </div>
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
