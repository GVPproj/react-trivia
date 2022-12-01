import { useState, useEffect } from "react"
import Answer from "./Answer"
import { nanoid } from "nanoid"

export default function Game() {
  const [questionData, setQuestionData] = useState(null)
  const [allAnswered, setAllAnswered] = useState(false)
  const [chosenAnswers, setChosenAnswers] = useState(null)
  let resultText = ''

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
  }, [])

  useEffect(() => {
    if (questionData) {
      let selectedAnswers = questionData.answers.map((answerSet) => {
        return answerSet.filter(function (e) {
          return e.isSelected
        })
      })
      let selectedAnswersArray = selectedAnswers[0].concat(
        selectedAnswers[1],
        selectedAnswers[2],
        selectedAnswers[3],
        selectedAnswers[4]
      )
      if (selectedAnswersArray.length === questionData.answers.length) {
        setChosenAnswers(selectedAnswersArray)
        setAllAnswered((prevState) => !prevState)
      }
    }
  }, [questionData])

  // Question Element
  function Question(props) {
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

  function checkAnswers() {
    if (allAnswered) {
      const correctAnswers = chosenAnswers.filter((e) => {
        return e.isCorrect
      })
      console.log(`You scored ${correctAnswers.length}/${questionData.answers.length} correct answers.`)
    } else{
      console.log("finish the quiz plz")
    }
  }

  function CheckButton() {
    return (
      <div className="check-answers">
        <button onClick={() => checkAnswers()}>Check Answers</button>
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

      <CheckButton />
    </div>
  )
}
