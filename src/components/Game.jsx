import { useState, useEffect } from "react"
import { decode } from "html-entities"
import Answer from "./Answer"
import { nanoid } from "nanoid"

export default function Game() {
  // const [isStarted, setIsStarted] = useState(false)
  const [questionData, setQuestionData] = useState(null)
  const [chosenAnswers, setChosenAnswers] = useState(null)
  const [prompt, setPrompt] = useState(false)
  const [allAnswered, setAllAnswered] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    newGame()
  }, [])

  function newGame() {
    // setIsStarted(true)
    setQuestionData(null)
    setChosenAnswers(null)
    setAllAnswered(false)
    setIsCompleted(false)

    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
    )
      .then((results) => results.json())
      .then((data) => {
        setQuestionData({
          questions: data.results.map((result) => decode(result.question)),
          answers: data.results.map((result) => {
            let answersArray = [
              {
                answer: decode(result.incorrect_answers[0]),
                isCorrect: false,
                isSelected: false,
                id: nanoid(),
                hasBeenChecked: false,
              },
              {
                answer: decode(result.incorrect_answers[1]),
                isCorrect: false,
                isSelected: false,
                id: nanoid(),
                hasBeenChecked: false,
              },
              {
                answer: decode(result.incorrect_answers[2]),
                isCorrect: false,
                isSelected: false,
                id: nanoid(),
                hasBeenChecked: false,
              },
              {
                answer: decode(result.correct_answer),
                isCorrect: true,
                isSelected: false,
                id: nanoid(),
                hasBeenChecked: false,
              },
            ]
            let shuffledAnswersArray = answersArray.sort(() =>
              Math.random() > 0.5 ? 1 : -1
            )
            return shuffledAnswersArray
          }),
        })
      })
  }

  //collect user's answers
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
      <div className="question--section">
        <h2>{props.question}</h2>
        <ul className="answers--set">
          {props.answers.map((option) => (
            <Answer
              key={option.id}
              selectAnswer={() => selectAnswer(option)}
              answer={option}
            />
          ))}
        </ul>
      </div>
    )
  }

  function CheckButton() {
    function checkIfCompleted() {
      if (allAnswered) {
        setIsCompleted(true)
      } else {
        setIsCompleted(false)
        setPrompt(true)
        setTimeout(() => {
          setPrompt((prevState) => !prevState)
        }, 1500)
      }
    }
    return <button className="btn--check" onClick={() => checkIfCompleted()}>Check Answers</button>
  }

  useEffect(() => {
    if (isCompleted) {
      setQuestionData((prevData) => {
        const updatedAnswers = prevData.answers.map((options) => {
          return options.map((option) => {
            return { ...option, hasBeenChecked: true }
          })
        })
        return {
          questions: prevData.questions,
          answers: updatedAnswers,
        }
      })
    }
  }, [isCompleted])

  // Results Element
  function Results() {
    if (isCompleted) {
      const correctAnswers = chosenAnswers.filter((e) => {
        return e.isCorrect
      })
      return `You scored ${correctAnswers.length}/${questionData.answers.length} correct answers.`
    }
  }
  function RestartButton() {
    return <button onClick={newGame}>Play Again</button>
  }

  return (
    <div className="quiz--page">
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
      <div className="check--and--results">
      {prompt && <span>Please complete the quiz.</span>}
      {isCompleted && <Results />}
      {(questionData && !isCompleted) && <CheckButton />}
      {isCompleted && <RestartButton />}
      </div>
    </div>
  )
}
