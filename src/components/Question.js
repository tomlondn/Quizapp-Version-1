import React from 'react'

const Question = React.memo(({ questionName, correctAnswer, incorrectAnswers, questionIndex, checkAnswer }) => {
  let answerPossibilities = [];

  incorrectAnswers.forEach((item, index) => {
    answerPossibilities.push({ "answer": item, "correct": false })
  });
  answerPossibilities.push({ "answer": correctAnswer, "correct": true });

  const shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
  
  shuffle(answerPossibilities);

  return (
    <section>
      <article className='oneQuestion'>
        <header>
          <h2>{questionName}</h2>
        </header>

        <div className='answerPossibilities'>
          {answerPossibilities.map((item, index) => {
            return (
              <div id="" onClick={checkAnswer} key={index} questionindex={questionIndex} className='answerPossibilitie' correct={item.correct ? "yes" : "no"}>{item.answer}</div>
            )
          })}
        </div>
      </article>
    </section>
  )
})
export default Question