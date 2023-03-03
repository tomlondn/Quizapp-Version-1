import React from 'react'
import Country from './Country';

const GuessedCountrys = ({ countrys }) => {
    return (
        <section className='guessedCountrys'>
            {
                countrys.map((item) => {
                    return (
                        
                        <Country
                            key={item.index}
                            name={item.name}
                            population={item.population}
                            continent={item.continent}
                            area={item.area}
                        ></Country>
                    )
                })
            }
        </section>
    )
}
export default GuessedCountrys;