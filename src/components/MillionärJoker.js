import React from 'react'

const MillionärJoker = ({version, setJoker}) => {
    return (
        <button onClick={(event) => setJoker(event, version)}>{version}</button>
    )
}
export default MillionärJoker;