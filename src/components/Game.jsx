import { useState, useEffect } from "react"
import Answer from "./Answer"
import { nanoid } from "nanoid"

export default function Game() {
  const [questionData, setQuestionData] = useState(null)
  const [chosenAnswers, setChosenAnswers] = useState([])

  // Fetch the Question Data
  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
    )
      .then((results) => results.json())
      .then((data) => {
        setQuestionData({
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
          }),
        })
      })
    // console.log(questionData)
  }, [])

  // Question Element
  function Question(props) {
    // const [options, setOptions] = useState(props.answers)

    function selectAnswer(e) {
      setQuestionData((prevData) => {
        const updatedOptions = prevData.answers[props.idx].map((option) => {
          return option.id === e.id
            ? { ...option, isSelected: true }
            : { ...option, isSelected: false }
        })
        let updatedAnswers = prevData.answers.map((optionArray, i) => {
          if (i === props.idx) {
            return updatedOptions
          } else {
            return optionArray
          }
        })
        return {
          questions: prevData.questions,
          answers: updatedAnswers,
        }
      })
    }

    return (
      <div className="question">
        <h2>{props.question}</h2>
        <ul className="answer-options">
          {props.answers.map((option) => (
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
        <button onClick={() => console.log(questionData.answers)}>Check Answers</button>
      </div>
    )
  }

  return (
    <div className="game-page">
      {questionData && (
        <Question
          idx={0}
          question={questionData.questions[0]}
          answers={questionData.answers[0]}
        />
      )}
      {questionData && (
        <Question
          idx={1}
          question={questionData.questions[1]}
          answers={questionData.answers[1]}
        />
      )}
      {questionData && (
        <Question
          idx={2}
          question={questionData.questions[2]}
          answers={questionData.answers[2]}
        />
      )}
      {questionData && (
        <Question
          idx={3}
          question={questionData.questions[3]}
          answers={questionData.answers[3]}
        />
      )}
      {questionData && (
        <Question
          idx={4}
          question={questionData.questions[4]}
          answers={questionData.answers[4]}
        />
      )}
      <Check />
    </div>
  )
}
