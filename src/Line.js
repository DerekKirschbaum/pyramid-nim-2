import React from 'react'



export default function Line (props) {
    const player = props.redPlayer
    if(player) {
        const imgSrc = props.isCrossed ? RedCrossedLine : BlackLine
    } else {
        const imgSrc = props.isCrossed ? BlueCrossedLine : BlackLine
    }

    return (
        <div className='line' onClick={props.crossLine}>
                <img className='line-img' src={imgSrc} alt="line"/>
        </div>
    )
}