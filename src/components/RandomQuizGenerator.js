import React, { useEffect, useState } from "react";
import QuestionCategorys from './QuestionCategorys'
import QuestionDifficultys from './QuestionDifficultys'
import axios from "axios";
import QuestionCount from "./QuestionCount";
import RandomQuizList from "./RandomQuizList";
import UserNameQuiz from "./UserNameQuiz";


const RandomQuizGenerator = () => {
  const catApiurl = "https://the-trivia-api.com/api/categories";
  const allDifficultys = [
    { active: null, difficulty: 'Easy' },
    { active: null, difficulty: 'Medium' },
    { active: null, difficulty: 'Hard' }
  ];

  const baseQuizConfig = {
    difficulty: null,
    categorie: null,
    count: null
  };

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficultys, setDifficulty] = useState(allDifficultys);
  const [quizConfig, setQuizConfig] = useState(baseQuizConfig);
  const [quizState, setQuizState] = useState("name"); 
  const [questionLoading, setQuestionLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const getCategorieArrayObjext = (cats) => {
    let newCatOby = [];

    cats.forEach(item => {
      newCatOby.push({ active: null, categorie: item })
    })
    return newCatOby;
  }
  const formatCat = (cat) => {
   cat = cat.replaceAll(" ", "_");
   cat = cat.replace("&", "and");
   console.log(cat);
   
    return cat;
  }
  const getCategory = (index) => {
    let quizCategorys = [...categories];
    let newQuizConfig = { ...quizConfig };

    quizCategorys.forEach(item => {
      item.active = false;
    })
    quizCategorys[index].active = true;

    setCategories(quizCategorys);

    newQuizConfig.categorie = quizCategorys[index].categorie;
    
    setQuizConfig(newQuizConfig);

  }
  const getDifficulty = (index) => {
    let quizDifficultys = [...difficultys];
    let newQuizConfig = { ...quizConfig };

    quizDifficultys.forEach(item => {
      item.active = false;
    })
    quizDifficultys[index].active = true;

    setDifficulty(quizDifficultys);

    newQuizConfig.difficulty = quizDifficultys[index].difficulty;
    setQuizConfig(newQuizConfig);

  }
  const getQuestionCount = (event) => {
    var count = event.currentTarget.value;
    var min = event.currentTarget.min;
    var max = event.currentTarget.max;
    let newQuizConfig = { ...quizConfig };

    if ((count >= min) && (count <= max)) {
      newQuizConfig.count = count;
    } else {
      newQuizConfig.count = null;
    }
    setQuizConfig(newQuizConfig);
  }

  const getQuizConfig = (event) => {
    event.preventDefault();

    if (quizConfig.categorie === null) {
      alert("Bitte Kategorie auswählen");
    } else if (quizConfig.difficulty === null) {
      alert("Bitte Schwierigkeit auswählen");
    } else if (!quizConfig.count) {
      alert("Bitte (gültige)Fragemenge eingeben");
    }

    if (quizConfig.categorie != null & !!quizConfig.count & quizConfig.difficulty != null) {

      var newApiUrl = "https://the-trivia-api.com/api/questions?categories=" +
      formatCat(quizConfig.categorie).toLowerCase() + "&limit=" + quizConfig.count + "&difficulty=" + quizConfig.difficulty.toLowerCase();

      setQuizState("startet");

      getQuestions(newApiUrl)
    }
  }

  const setUserName = (event) => {
    localStorage.setItem("Username" , event.currentTarget.value)
  }
  
  const changeQuizScore = () => {
      sessionStorage.setItem("Score", parseInt(sessionStorage.getItem("Score")) + 1);
  }

  const changeQuizState = (state) => {
    setQuizState(state);
  }

  const getQuestions = async (url) => {
    const res = await axios.get(url);
    setQuestions(res.data);
    setQuestionLoading(false);
  };

  useEffect(() => {
    const getCartgories = async () => {
      const res = await axios.get(catApiurl);
      setCategories(getCategorieArrayObjext(Object.keys(res.data)));
      setLoading(false);
    };

    getCartgories();
  }, []);

  return (
    <section>
      {loading ? (
        <h4>Wait for Api...</h4>) :
        quizState === "name" & !questionLoading ?
          (
            sessionStorage.clear(),
            <section className="takeName">
              <header>
                <h1> Erstelle dein Random Quiz Schritt 1 von 2</h1>
              </header>
              <UserNameQuiz
                setName={setUserName}
                setState= {changeQuizState}
              ></UserNameQuiz>

            </section>

          ) : quizState === "config" ? (

            <section className="quizConfig">
              <header>
                <h1> Erstelle dein Random Quiz Schritt 2 von 2</h1>
              </header>

              <QuestionCategorys
                setCategorie={getCategory}
                categories={categories}
              ></QuestionCategorys>

              <QuestionDifficultys
                setDifficulty={getDifficulty}
                difficultys={difficultys}
              ></QuestionDifficultys>

              <QuestionCount
                setCount={getQuestionCount}
                startQuiz={getQuizConfig}
              ></QuestionCount>
            </section>

          ) : quizState === "startet" ? (

            sessionStorage.setItem("Score", 0),
            
            <section className="quizStartet">
              <header>
                <h1>Quiz</h1>
                <h2>Schwierigkeit: {quizConfig.difficulty} </h2>
                <h2>Kategorie: {quizConfig.categorie}</h2>
              </header>

              <RandomQuizList
                allQuestions={questions}
                setState = {changeQuizState}
                changeScore = {changeQuizScore}
              ></RandomQuizList>

              <p onClick={() => setQuizState("config")} className=' button'>Zurück zur Quiz-Konfig</p>
            </section>

          ) : (
            <section className="quizScore">
              <header>
                <h1>Auswertung von {localStorage.getItem("Username")}</h1>
                <h2>{sessionStorage.getItem("Score")} von {quizConfig.count} Fragen richtig</h2>
              </header>

            </section>
          )
      }
    </section>
  )
}

export default RandomQuizGenerator