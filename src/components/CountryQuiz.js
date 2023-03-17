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
        console.log(res);

        if(res.status === 200) {
            formatApiCountryData(res.data);
            setQuizState("guess");

        } else {
            setQuizState("apiError");
        }
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
        const searchedCountry = { ...countryToGuess }
        const alreadyGuessed = [...guessedCountrys]
        const countrys = [...allCountrys]
        const remainingGuesses = guesses
        const lastGuessed = window.sessionStorage.getItem("lastGuessed");
        const allCountryNames = countrys.map(value => value.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        const input = e.currentTarget.value.toLowerCase();
        const countryError = document.getElementById("noValidInput");


        if (e.key === "Enter") {
            e.preventDefault();

            if (allCountryNames.includes(input) === false)  {

                countryError.innerHTML = "Bitte eingabe Überprüfen";
                countryError.style.color = "red";

            } else if  (input.value === searchedCountry.name) {

                alert("Glückwunsch das gesuchte Land war "+searchedCountry.name)

            } else {
                
                countryError.innerHTML = "";
                countryError.style.color = "black";

                generateSessionStorage(input);


                if (input !== lastGuessed) {

                    alreadyGuessed.push(countrys.find(item => item.name.toLowerCase() === input));
                    setGuessedCountrys(alreadyGuessed);
                    setGuesses(remainingGuesses - 1)

                }

            }
        }
    }
    const startQuiz = (e) => {
        e.preventDefault();
        callApi();
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

                        <p id='noValidInput'></p>

                        <InputField
                            action={checkCountry}
                            inputLabel={"Land eingeben:"}
                            placeholder={"Enter drücken zur Tippabgabe"}
                            button={false}
                            input={true}
                        ></InputField>

                        <GuessedCountrys
                            countrys={guessedCountrys}
                            countryToGuess = {countryToGuess}
                        ></GuessedCountrys>
                    </section>
                ) : quizState === "apiError" (
                    <section>
                        <header>
                            <h2> API aktuell nicht verfügbar</h2>
                        </header>
                    </section>
                )
            }

        </section>
    )
}
export default CountryQuiz;
