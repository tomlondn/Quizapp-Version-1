import './App.css';
import RandomQuizGenerator from './components/RandomQuizGenerator';
import MillionärQuiz from './components/MillionärQuiz';
import CountryQuiz from './components/CountryQuiz';

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

        <section className='quizVariantButton' id="MillionärQuiz" onClick={getToQuiz}>
          <header><h2>Quiz-Millionär Art</h2></header>
        </section>

        <section className='quizVariantButton' id="CountryQuiz" onClick={getToQuiz}>
          <header><h2>Länder raten</h2></header>
        </section>
      </section>

      <section className='showQuizVariant'>
        
        <section id="showRandomQuiz" className="hide quizVariant">
          <RandomQuizGenerator />
        </section>

        <section id="showMillionärQuiz" className="hide quizVariant">
          <MillionärQuiz/>
        </section>

        <section id="showCountryQuiz" className="hide quizVariant">
          <CountryQuiz/>
        </section>

      </section>
    </section>
  );
}

export default App;
