import React from 'react'
import BlackLine from './Images/BlackLine.jpg'
import BlueCrossedLine from './Images/BlueCrossedLine.jpg'
import RedCrossedLine from './Images/RedCrossedLine.jpg'



export default function Line (props) {
    const player = props.redPlayer
    const imgSrc = props.src
    if(player) {
        imgSrc = props.isCrossed ? RedCrossedLine : BlackLine
    } else {
        imgSrc = props.isCrossed ? BlueCrossedLine : BlackLine
    }

    return (
        <div className='line' onClick={props.crossLine}>
                <img className='line-img' src={imgSrc} alt="line"/>
        </div>
    )
}