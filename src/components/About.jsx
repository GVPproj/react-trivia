export default function About() {
  return (
    <div className="z-1 flex info--page">
      <h1>About</h1>
      <br />
      <div>
        <p>
          This is a <a href="https://reactjs.org/">React JS</a> app, using trivia questions imported from the <a href="https://opentdb.com/">Open Trivia API</a>.
        </p>
        <br />
        <p>App idea and figma design from <strong>Bob Ziroll's</strong> React course at <a href="https://scrimba.com/learn/learnreact">Scrimba</a>.</p>
        <br />
        <p>Coded and re-designed by <a href="https://github.com/GVPproj"><strong>Graham Van Pelt</strong></a>.</p>
      </div>
    </div>
  )
}
