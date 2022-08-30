import React from 'react'

const QuestionDifficulty = ({difficulty, index, quizDifficulty, active}) => {
    return (
        <li onClick={() => {quizDifficulty(index) }} className={active ? "listItem itemActive" : "listItem"}>{active ? 'Auswahl:' : ''} {difficulty}</li>
    )
}
export default QuestionDifficulty;

