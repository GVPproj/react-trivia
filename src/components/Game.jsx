import { useState, useEffect } from "react"
import Answer from "./Answer"
import { nanoid } from "nanoid"

export default function Game() {
  const [questionData, setQuestionData] = useState(null)

  // Fetch the Question Data
  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
    )
      .then((results) => results.json())
      .then((data) => {
        setQuestionData(
          {
            questions: data.results.map((result) => result.question), 
            answers: data.results.map((result) => {
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
          }
        )
  })}, [])

  // Question Element
  function Question(props) {
    const [options, setOptions] = useState(props.answers)
    function selectAnswer(e) {
      setOptions((prevOptions) => {
        return prevOptions.map((option) => {
          return option.id === e.id
            ? { ...option, isSelected: true }
            : { ...option, isSelected: false }
        })
      })
    }

    return (
      <div className="question">
        <h2>{props.question}</h2>
        <ul className="answer-options">
          {options.map((option) => (
            <Answer
              key={option.id}
              selectAnswer={() => selectAnswer(option)}
              answer={option}
            />
          ))}
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
      {questionData && <Question question={questionData.questions[0]} answers={questionData.answers[0]} />}
      {questionData && <Question question={questionData.questions[1]} answers={questionData.answers[1]} />}
      {questionData && <Question question={questionData.questions[2]} answers={questionData.answers[2]} />}
      {questionData && <Question question={questionData.questions[3]} answers={questionData.answers[3]} />}
      {questionData && <Question question={questionData.questions[4]} answers={questionData.answers[4]} />}
      <Check />
    </div>
  )
}
