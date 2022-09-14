import React from 'react'
import BlackLine from './Images/BlackLine.jpg'
import BlueCrossedLine from './Images/BlueCrossedLine.jpg'
import RedCrossedLine from './Images/RedCrossedLine.jpg'



export default function Line (props) {

    let imgSrc
    if(props.redPlayer) {
        imgSrc = props.isCrossed ? RedCrossedLine : BlackLine
    } else {
        imgSrc = props.isCrossed ? BlueCrossedLine : BlackLine
    }

    return (
        <div className={(props.isCrossed && props.canChange)? 'line-selected' : 'line'} onClick={props.crossLine}>
                <img className='line-img' src={imgSrc} alt="line"/>
        </div>
    )
}