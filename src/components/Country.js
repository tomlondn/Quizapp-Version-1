import React from 'react'

const Country = ({ name, population, continent, area }) => {

    return (

        <div className='oneCountry'>
            <span className='countryItem itemName'>{name}</span><br/>
            <span className='countryItem itemPopulation'>Einwohnerzahl: {population}</span>
            <span className='countryItem itemContinent'>Kontinent: {continent}</span>
            <span className='countryItem itemArea'>Flächengröße: {area}</span>
        </div>
    )
}
export default Country;