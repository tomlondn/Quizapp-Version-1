import React, { useState } from 'react'
import axios from 'axios'
import InputField from './InputField';
import GuessedCountrys from './GuessedCountrys';

const CountryQuiz = () => {
    const apiUrl = "https://restcountries.com/v3.1/all";
    const [quizState, setQuizState] = useState("generate");
    const [countryToGuess, setCountryToGuess] = useState({});
    const [guessedCountrys, setGuessedCountrys] = useState([]);
    const [allCountrys, setCountrys] = useState([]);
    const [guesses, setGuesses] = useState(5);

    const callApi = async () => {
        const res = await axios.get(apiUrl);
        formatApiCountryData(res.data);
    }
    const formatApiCountryData = (apiData) => {
        let filteredData = [];
        apiData.forEach((item) => {
            filteredData.push({
                "name": item.translations.deu.common,
                "population": item.population,
                "capital": item.capital?.[0],
                "continent": item.continents?.[0],
                "area": item.area
            })
        })
        setCountrys(filteredData);

        var keys = Object.keys(filteredData);
        setCountryToGuess(filteredData[keys[keys.length * Math.random() << 0]]);
    }

    const generateSessionStorage = (country) => {
        window.sessionStorage.setItem("lastGuessed", country)
    }

    const checkCountry = (e) => {
        let searchedCountry = { ...countryToGuess }
        let alreadyGuessed = [...guessedCountrys]
        let countrys = [...allCountrys]
        let remainingGuesses = guesses
        let lastGuessed = window.sessionStorage.getItem("lastGuessed");

        console.log(guessedCountrys);

        if (e.key === "Enter") {
            e.preventDefault();

            if (e.currentTarget.value === searchedCountry.name) {
                //Win
            } else {
                countrys.forEach((countryitem) => {
                    if (e.currentTarget.value === countryitem.name) {

                        generateSessionStorage(countryitem.name);

                        if (countryitem.name !== lastGuessed) {
                            alreadyGuessed.push(countryitem);
                            setGuesses(remainingGuesses.remaining - 1);
                        }
                        setGuessedCountrys(alreadyGuessed);
                        setGuesses(remainingGuesses - 1)
                    }
    
                })

            }
        }
    }
    const startQuiz = (e) => {
        e.preventDefault();
        callApi();
        setQuizState("guess");
    }

    return (

        <section className="countryQuiz">
            <header>
                <h1>Land in 5 versuchen erraten</h1>
            </header>
            {quizState === "generate" ?
                (
                    <InputField
                        action={startQuiz}
                        buttonLabel={"Generieren"}
                        button={true}
                        input={false}

                    ></InputField>
                )

                : quizState === "guess" ? (
                    <section className='guessing'>

                        <header>
                            <h2>noch {guesses} versuche</h2>
                        </header>

                        <InputField
                            action={checkCountry}
                            inputLabel={"Land eingeben:"}
                            placeholder={"Enter drücken zur Tippabgabe"}
                            button={false}
                            input={true}
                        ></InputField>

                        <GuessedCountrys
                            countrys={guessedCountrys}
                        ></GuessedCountrys>
                    </section>
                ) : ""
            }

        </section>
    )
}
export default CountryQuiz;
