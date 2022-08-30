import React from 'react'
import Question from './Question'
import { useState } from 'react'

const RandomQuizList = ({ allQuestions, setState, changeScore }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0);


    const checkAnswer = (event) => {
        var answerPossibilities = document.getElementsByClassName(event.currentTarget.className);

        for (var answerPossibilitie of answerPossibilities) {
            if (answerPossibilitie.getAttribute("correct") === "yes") {
                var correctAnswer = answerPossibilitie;
            }

        }

            if (event.currentTarget.getAttribute("correct") === "yes") {

                event.currentTarget.style.backgroundColor = "green";
                event.currentTarget.style.color = "white";

                changeScore();
              
            } else {
                correctAnswer.className = correctAnswer.className + " blinking"


                event.currentTarget.style.backgroundColor = "red";
                event.currentTarget.style.color = "white";
            }

            setTimeout(nextQuestion, 2000);
    }

    const nextQuestion = () => {
        if (currentQuestion === allQuestions.length - 1) {
            setState("score");
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    return (
        <section className='quizList'>
            <div>Question <span id="actualQuestionPosition">{(currentQuestion < allQuestions.length) ? currentQuestion + 1 : currentQuestion}</span> of {allQuestions.length} </div>
            {allQuestions.map((item, index) => {
                if (index === currentQuestion) {
                    return (
                        <Question
                            key={index}
                            questionIndex={index}
                            questionName={item.question}
                            correctAnswer={item.correctAnswer}
                            incorrectAnswers={item.incorrectAnswers}
                            checkAnswer={checkAnswer}
                            changeQuestion={nextQuestion}
                        ></Question>
                    )
                }
            })}
        </section>
    )
}
export default RandomQuizList