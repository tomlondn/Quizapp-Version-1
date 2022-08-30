import React from 'react'

const UserNameQuiz = ({ setName, setState }) => {
    return (
        <form>
            <label>
                Namen eingeben und loslegen
            </label>
            <input id="setUsername" onChange={setName} type="text"></input>
            <button onClick ={() => {setState("config")}}>Los</button>
        </form>
    )
}
export default UserNameQuiz