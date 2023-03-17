import React from 'react'

const Country = ({ countryToGuess, name, population, continent, area }) => {
    //check properties
    var arrowClass = "arrow ";
    var arrowClassPopulation;
    var arrowClassArea;
    var validateKontintent;
    
    //Population
    countryToGuess.population < population ? arrowClassPopulation = arrowClass + "down" : arrowClassPopulation = arrowClass + "up";

    //check Area
    countryToGuess.area < area ? arrowClassArea = arrowClass + "down" : arrowClassArea = arrowClass + "up";

    //check continent
    countryToGuess.continent ===  continent ? validateKontintent = true : validateKontintent = false;


    return (
            <div className='oneCountry'>
                <span className='countryItem itemName'>{name}</span><br/>
                <span className='countryItem' id ='itemPopulation'>{population.toLocaleString('de-EU')}<span><i className={arrowClassPopulation}></i></span></span>
                <span className={validateKontintent ? "itemContintenTrue countryItem" : "itemContintenFalse countryItem"} id ='itemContinent' >{continent}</span>
                <span className='countryItem' id ='itemArea'>{area.toLocaleString('de-EU')} km²<span><i className={arrowClassArea}></i></span></span>
            </div>
    )
        
}
export default Country;