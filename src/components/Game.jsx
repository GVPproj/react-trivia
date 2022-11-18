import { useState, useEffect } from "react"

export default function Game() {
  const [questions, setQuestions] = useState(null)

  useEffect(() => {
    async function getQs() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
      )
      const data = await res.json()
      setQuestions(
        data.results.map((result) => {
          return {
            question: result.question,
            answers: [...result.incorrect_answers, result.correct_answer],
          }
        })
      )
    }
    getQs()
  }, [])

  console.log(questions)

  function Question(props) {
    return (
      <div className="question">
        <h2>{props.q}</h2>
        <ul className="answer-options">
          <li>{props.answers[0]}</li>
          <li>{props.answers[1]}</li>
          <li>{props.answers[2]}</li>
          <li>{props.answers[3]}</li>        
        </ul>
        <hr />
      </div>
    )
  }
  function Check() {
    return (
      <div className="check-answers">
        <button>Check Answers</button>
      </div>
    )
  }

  return (
    <div className="game-page">
      {questions && <Question q={questions[0].question} answers={questions[0].answers}/>}
      {questions && <Question q={questions[1].question} answers={questions[1].answers}/>}
      {questions && <Question q={questions[2].question} answers={questions[2].answers}/>}
      {questions && <Question q={questions[3].question} answers={questions[3].answers}/>}
      {questions && <Question q={questions[4].question} answers={questions[4].answers}/>}
      <Check />
    </div>
  )
}
