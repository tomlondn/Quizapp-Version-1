import React from 'react'

const UserNameQuiz = ({ setName, setStateCheckName }) => {

    return (
        <form>
            <label>
                Namen eingeben und loslegen
            </label>
            <input id="setUsername" onChange={setName} type="text"></input>
            <button onClick = {setStateCheckName}>Los</button>
        </form>
    )
}
export default UserNameQuiz