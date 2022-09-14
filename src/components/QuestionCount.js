import React from 'react'

 const QuestionCount = ({setCount, startQuiz}) => {
  return (
    <section className='questionCount'>
        <header>
            <h2>Fragenmenge:</h2>
        </header>
        <form>
        <input className='inputQuestionCount' placeholder="Min:5 Max:50" onChange={setCount} step="5" min="5" max="50" type="number"/>
        <input onClick={startQuiz} value="Generieren!" type="submit"/>
        </form>
        

    </section>
  )
}
export default QuestionCount
