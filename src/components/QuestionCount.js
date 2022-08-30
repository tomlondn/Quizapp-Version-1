import React from 'react'

 const QuestionCount = ({setCount, startQuiz}) => {
  return (
    <section className='questionCount'>
        <header>
            <h2>Fragenmenge:</h2>
        </header>
        <form>
        <input className='inputQuestionCount' placeholder="Min:1 Max:50" onChange={setCount} min="1" max="50" type="number"/>
        <input onClick={startQuiz} value="Generieren!" type="submit"/>
        </form>
        

    </section>
  )
}
export default QuestionCount
