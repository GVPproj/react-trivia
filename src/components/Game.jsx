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
          let wrongAnswers = [...result.incorrect_answers]
          let rightAnswer = result.correct_answer
          let answersArray = [
            { answer: wrongAnswers[0], isCorrect: false },
            { answer: wrongAnswers[1], isCorrect: false },
            { answer: wrongAnswers[2], isCorrect: false },
            { answer: rightAnswer, isCorrect: true },
          ]
          let shuffledAnswersArray = answersArray.sort(() => (Math.random() > .5) ? 1 : -1);

          return {
            question: result.question,
            answers: shuffledAnswersArray,
          }
        })
      )
    }
    getQs()
  }, [])

  // function chooseAnswer(ans){
  //   console.log(answers[ans].isCorrect)
  // }
  

  function Question(props) {
    return (
      <div className="question">
        <h2>{props.q}</h2>
        <ul className="answer-options">
          <li onClick={()=> console.log(props.answers[0].isCorrect)}>{props.answers[0].answer}</li>
          <li onClick={()=> console.log(props.answers[1].isCorrect)}>{props.answers[1].answer}</li>
          <li onClick={()=> console.log(props.answers[2].isCorrect)}>{props.answers[2].answer}</li>
          <li onClick={()=> console.log(props.answers[3].isCorrect)}>{props.answers[3].answer}</li>
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
      {questions && (
        <Question q={questions[0].question} answers={questions[0].answers} />
      )}
      {questions && (
        <Question q={questions[1].question} answers={questions[1].answers} />
      )}
      {questions && (
        <Question q={questions[2].question} answers={questions[2].answers} />
      )}
      {questions && (
        <Question q={questions[3].question} answers={questions[3].answers} />
      )}
      {questions && (
        <Question q={questions[4].question} answers={questions[4].answers} />
      )}
      <Check />
    </div>
  )
}
