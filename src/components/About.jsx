export default function About() {
  return (
    <div className="flex info--page">
      <h1>About</h1>
      <br />
      <div>
        <p>
          This app is rendered with React. The questions are imported from the <a href="https://opentdb.com/">Open Trivia API</a>.
        </p>
        <br />
        <p>App idea and initial design from <strong>Bob Ziroll's</strong> React course on <a href="https://scrimba.com/learn/learnreact">Scrimba</a>.</p>
        <br />
        <p>Code and design flourishes by <a href="https://github.com/GVPproj"><strong>Graham Van Pelt</strong></a>.</p>
      </div>
    </div>
  )
}
