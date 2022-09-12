import React from 'react'

export default function Line (props) {
    return (
        <div className='line'>
            <h1>{props.text ? "true" : "false"}</h1>
        </div>
    )
}