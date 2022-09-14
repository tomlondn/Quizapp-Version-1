import React, { useState } from "react";
import UserNameQuiz from './UserNameQuiz';
import RandomQuizList from './RandomQuizList';
import axios from "axios";
import QuizScore from "./QuizScore";
import MillionärJoker from "./MillionärJoker";

const MillionärQuiz = () => {
  const [quizState, setQuizState] = useState("name");
  const [allQuestions, setQuestions] = useState([]);

  const changeQuizState = (state) => {
    setQuizState(state);
  }

  const setUserName = (event) => {
    sessionStorage.setItem("UsernameMillionär", event.currentTarget.value)
  }

  const getUrl = (difficulty) => {
    var url = "https://the-trivia-api.com/api/questions?difficulty=" + difficulty + "&limit=5";
    return url
  }

  const buildQuizQuestions = async () => {
    let newQuestionArr = [];
    const buildQuestions = Promise.all([axios.get(getUrl("easy")), axios.get(getUrl("medium")), axios.get(getUrl("hard"))]);

    await buildQuestions
      .then((questions) => questions.forEach(item => {
        item.data.forEach(question => {
          newQuestionArr.push(question);
        });
      }))
      .catch(error => {
        console.log(error)
      })
    setQuestions(newQuestionArr);
  }

  const checkeNameSetState = (event) => {
    event.preventDefault();
    buildQuizQuestions();

    if (sessionStorage.getItem("UsernameMillionär")) {
      changeQuizState("startet");

    } else {
      alert("Bitte einen Namen eingeben!");
    }
  }

  const changeQuizScore = () => {
    sessionStorage.setItem("Score", parseInt(sessionStorage.getItem("Score")) + 1);
  }

  const setJoker = (event, version) => {
     event.preventDefault();
     var answerPossibilities = document.getElementsByClassName("answerPossibilitie");

    if(version === "5050") {
      var countToDisable = 2;

      for (var answerPossibilitie of answerPossibilities) {
        console.log(countToDisable);
        if (answerPossibilitie.getAttribute("correct") === "no" && countToDisable > 0) {
          answerPossibilitie.className=answerPossibilitie.className + " disable";
          countToDisable--;
        }
      }
      event.currentTarget.style.display = "none";
    } else if (version === "show Answer"){

      for (var answerPossibilitie of answerPossibilities) {
        if (answerPossibilitie.getAttribute("correct") === "no") {
          answerPossibilitie.className=answerPossibilitie.className + " disable";
        }
      }
      event.currentTarget.style.display = "none";
    }
  }

  return (
    <section className="millionärQuiz">

      {quizState === "name" ?
        (
          sessionStorage.clear(),
          <section>
            <header>
              <h1>Starte dein Quiz nach "Wer Wird Millionär" Art</h1>
            </header>
            <p>15 Fragen - 5 Leichte - 5 Mittlere - 5 Schwere<br />
              Ein Fehler und das Quiz ist vorbei - 2 50/50 und 1 "richtige Antwort" zeigen Joker
            </p>

            <UserNameQuiz
              setName={setUserName}
              setStateCheckName={checkeNameSetState}
            ></UserNameQuiz>
          </section>
        ) : quizState === "startet" ?
          (

            sessionStorage.setItem("Score", 0),
            <section className="quizStarted">
              <header>
                <h1>Quiz</h1>
              </header>

              <RandomQuizList
                isMillionär={true}
                allQuestions={allQuestions}
                setState={changeQuizState}
                changeScore={changeQuizScore}
              ></RandomQuizList>
              
              <div className="joker">
                <MillionärJoker
                version="5050"
                setJoker={setJoker}
                ></MillionärJoker>

                <MillionärJoker
                version="5050"
                setJoker={setJoker}
                ></MillionärJoker>

                <MillionärJoker
                version="show Answer"
                setJoker={setJoker}
                ></MillionärJoker>
              </div>

            </section>

          ) : (
            <QuizScore
            isMillionär={true}
            setQuizState={setQuizState}
            ></QuizScore>
          )
      }
    </section>
  )
}
export default MillionärQuiz