export default function Answer(props){

    function buttonColour(){
        if(props.answer.hasBeenChecked && props.answer.isSelected){
            return '#94D7A2'
        }else if(props.answer.hasBeenChecked && props.answer.isCorrect && !props.answer.isSelected){
            return '#F8BCBC'
        }else if(props.answer.isSelected && !props.answer.hasBeenChecked){
            return '#D6DBF5'
        }else{
            return '#ffffff'
        }
    }

    const styles = {
        backgroundColor: buttonColour(),
        border: props.answer.isSelected ? "none" : "0.771045px solid #4D5B9E" 
    }

    return(
        <li className="answer"
            style={styles}
            onClick={props.selectAnswer}>
            {props.answer.answer}
        </li>
    )
}