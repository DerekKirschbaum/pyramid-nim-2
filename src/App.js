import React from 'react'
import Line from './Line'

export default function App () {

  const [state, setState] = React.useState("Testing")

  return (
    <div className='main'>
      <div className='header'>
        <h1 className='title'>Pyramid Nim</h1>
        <p className='instructions'>Players alternate turns, crossing off as many 
          adjacent lines in the same row as they want. 
          The winner is the player that crosses off the last line.
        </p>
      </div>
      <div className='gameBox'>
        <Line text={state}/>
      </div>
      
    </div>
  );
};
