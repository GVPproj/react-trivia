export default function Answer(props) {
  const ans = props.answer
  let answerBG = ""
  let answerBorder = ""

  if (ans.hasBeenChecked) {
    if (ans.isSelected) {
      ans.isCorrect ? (answerBG = "#94D7A2") : (answerBG = "#F8BCBC")
    } else {
      ans.isCorrect ? (answerBG = "#94D7A2") : (answerBG = "#fff")
    }
  } else {
    ans.isSelected ? (answerBG = "#94D7A2") : (answerBG = "#fff")
  }

  ans.isSelected || (ans.isCorrect && ans.hasBeenChecked) ? answerBorder = '#fff' : answerBorder = "#4D5B9E"
  

  const styles = {
    backgroundColor: answerBG,
    border: `1px solid ${answerBorder}`,
  }

  return (
    <li
      className="flex z-1 answer"
      style={styles}
      onClick={!props.answer.hasBeenChecked ? props.selectAnswer : () => {}}
    >
      {props.answer.answer}
    </li>
  )
}
