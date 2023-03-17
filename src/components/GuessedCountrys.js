import React from 'react'
import Country from './Country';

const GuessedCountrys = ({ countrys, countryToGuess }) => {
    return (
        <section className='guessedCountrys'>
            <div className='countryHeaderProperties'>
               <span className='countryProp'>Einwohnerzahl -</span>
               <span className='countryProp'> Kontinent -</span>
               <span className='countryProp'> Flächengröße</span>
            </div>

            {
                countrys.map((item) => {
                    return (
                        
                        <Country
                            key={item.index}
                            name={item.name}
                            population={item.population}
                            continent={item.continent}
                            area={item.area}
                            countryToGuess = {countryToGuess}
                        ></Country>
                    )
                })
            }
        </section>
    )
}
export default GuessedCountrys;