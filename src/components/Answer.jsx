// import { redirect } from "react-router-dom"

export default function Answer(props){

    const styles ={
        backgroundColor: props.answer.isSelected ? "red" : "pink"
    }

    return(
        <li className="answer"
            style={styles}
            onClick={props.selectAnswer}>
            {props.answer.answer}
        </li>
    )
}