import React from 'react'
import BlackLine from './Images/BlackLine.jpg'
import BlueCrossedLine from './Images/BlueCrossedLine.jpg'
import RedCrossedLine from './Images/RedCrossedLine.jpg'


export default function Line (props) {
    const imgSrc = props.isCrossed ? RedCrossedLine : BlackLine
    const x = BlueCrossedLine

    return (
        <div className='line' onClick={props.crossLine}>
                <img className='line-img' src={imgSrc} alt="line"/>
        </div>
    )
}