import './App.css';
import RandomQuizGenerator from './components/RandomQuizGenerator';
import Questionairies from './components/Questionairies';

function App() {
  const getToQuiz = element => {
    let elementToShow = document.getElementById("show" + element.currentTarget.id);
    let clickedElement = document.getElementById(element.currentTarget.id);
    let allQuizVariantsButtons = document.getElementsByClassName("quizVariantButton");
    let allQuizVariantsConfigs = document.getElementsByClassName("quizVariant");

    for (let item of allQuizVariantsButtons) {
      item.className = "quizVariantButton";
    }
    for (let item of allQuizVariantsConfigs) {
      item.className = "quizVariant hide";
    }

    if (elementToShow.className === "quizVariant hide") {
      clickedElement.className = "quizVariantButton active";
      elementToShow.className = "quizVariant show"
    } else {
      clickedElement.className = "quizVariantButton";
      elementToShow.className = "quizVariant hide"
    }
  }
  return (
    <section className="App">
      <header className="App-header">
        <h1>Quiz-App</h1>
      </header>

      <section className='chooseQuizVariants'>
        <section className='quizVariantButton' id="RandomQuiz" onClick={getToQuiz}>
          <header><h2>Random-Quiz</h2></header>
        </section>

        <section className='quizVariantButton' id="Questionairies" onClick={getToQuiz}>
          <header><h2>Fragebögen</h2></header>
        </section>
      </section>

      <section className='showQuizVariant'>
        <section id="showRandomQuiz" className="hide quizVariant">
          <RandomQuizGenerator />
        </section>

        <section id="showQuestionairies" className="hide quizVariant">
          <Questionairies />
        </section>
      </section>
    </section>
  );
}

export default App;
