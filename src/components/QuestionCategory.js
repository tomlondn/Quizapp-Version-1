import React from 'react'

const QuestionCategory = ({categorie, active, index, quizCat }) => {
    return (
        <li onClick={() => {quizCat(index) }} value={categorie} className={active ? "listItem itemActive"  : "listItem"}>{active ? 'Auswahl:' : ''} {categorie}</li>
    )
}
export default QuestionCategory;