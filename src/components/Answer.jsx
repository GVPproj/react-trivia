export default function Answer(props) {
  let answerBG = ""
  let answerBorder = ""

  if (props.answer.hasBeenChecked && props.answer.isSelected) {
    answerBG = "#94D7A2"
  } else if (
    props.answer.hasBeenChecked &&
    props.answer.isCorrect &&
    !props.answer.isSelected
  ) {
    answerBG = "#F8BCBC"
  } else if (props.answer.isSelected && !props.answer.hasBeenChecked) {
    answerBG = "#D6DBF5"
  } else {
    answerBG = "#ffffff"
  }

  if (props.answer.isSelected) {
    answerBorder = "#ffffff"
  } else if (
    props.answer.hasBeenChecked &&
    props.answer.isCorrect &&
    !props.answer.isSelected
  ) {
    answerBorder = "#ffffff"
  } else {
    answerBorder = "#4D5B9E"
  }

  const styles = {
    backgroundColor: answerBG,
    border: `1px solid ${answerBorder}`
  }

  return (
    <li className="answer" style={styles} onClick={props.selectAnswer}>
      {props.answer.answer}
    </li>
  )
}
