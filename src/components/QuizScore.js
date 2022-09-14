import React from 'react'

const QuizScore = ({ quizConfig, setQuizState, isMillionär }) => {
    return (
        <section className="quizScore">
            <header>
                <h1>Auswertung von {localStorage.getItem("Username")}</h1>

                {isMillionär

                    ? sessionStorage.getItem("Score") < 15 
                        ? (<h2> Schade Sie sind an der {parseInt(sessionStorage.getItem("Score")) + 1} Frage gescheitert! Versuchen sie es doch noch einmal </h2>)
                        : (<h2> Glückwunsch Sie haben alle Fragen richtig beantwortet! </h2>)
                    : <h2>{sessionStorage.getItem("Score")} von {quizConfig.count} Fragen richtig</h2>
                }

            </header>
            <p onClick={() => setQuizState("name")} className=' button'>Zurück zur Anfang </p>

        </section>
    )
}
export default QuizScore;
