import { useState, useEffect } from "react"
import Answer from "./Answer"
import { nanoid } from "nanoid"

export default function Game() {
  const [questions, setQuestions] = useState(null)
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    async function getQs() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
      )
      const data = await res.json()
      setQuestions(data.results.map((result) => result.question))
      setAnswers(
        data.results.map((result) => {
          let answersArray = [
            {
              answer: result.incorrect_answers[0],
              isCorrect: false,
              isSelected: false,
              id: nanoid(),
            },
            {
              answer: result.incorrect_answers[1],
              isCorrect: false,
              isSelected: false,
              id: nanoid(),
            },
            {
              answer: result.incorrect_answers[2],
              isCorrect: false,
              isSelected: false,
              id: nanoid(),
            },
            {
              answer: result.correct_answer,
              isCorrect: true,
              isSelected: false,
              id: nanoid(),
            },
          ]
          let shuffledAnswersArray = answersArray.sort(() =>
            Math.random() > 0.5 ? 1 : -1
          )
          return shuffledAnswersArray
        })
      )
    }
    getQs()
  }, [])

  function selectAnswer(id) {
    console.log(id)
    // setAnswers((oldAnswers) => oldAnswers.map((answer) => {
    //   // console.log(answer)
    //   // return answer.id === id ? { ...answer, isSelected: !answer.isSelected } : answer
    // }))
  }

  function Question(props) {
    return (
      <div className="question">
        <h2>{props.question}</h2>
        <ul className="answer-options">
          <Answer
            selectAnswer={() => selectAnswer(props.answers[0].id)}
            answer={props.answers[0]}
          />
          <Answer
            selectAnswer={() => selectAnswer(props.answers[1].id)}
            answer={props.answers[1]}
          />
          <Answer
            selectAnswer={() => selectAnswer(props.answers[2].id)}
            answer={props.answers[2]}
          />
          <Answer
            selectAnswer={() => selectAnswer(props.answers[3].id)}
            answer={props.answers[3]}
          />
        </ul>
        <hr />
      </div>
    )
  }

  function Check() {
    return (
      <div className="check-answers">
        <button onClick={() => console.log("clicked check btn")}>
          Check Answers
        </button>
      </div>
    )
  }

  return (
    <div className="game-page">
      {questions && <Question question={questions[0]} answers={answers[0]} />}
      {questions && <Question question={questions[1]} answers={answers[1]} />}
      {questions && <Question question={questions[2]} answers={answers[2]} />}
      {questions && <Question question={questions[3]} answers={answers[3]} />}
      {questions && <Question question={questions[4]} answers={answers[4]} />}
      <Check />
    </div>
  )
}
