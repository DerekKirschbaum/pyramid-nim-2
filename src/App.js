import React from 'react'
import Line from './Line'

export default function App () {

  const [lineElements, setLineElements] = React.useState(newLines())

  function newLines () {
    const list = []
    for(let i=0; i<15; i++){
      list.push({
        key: i+1,
        id: i + 1
      })
    }
    return list
  }


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
        <Line text={lineElements.id}/>
      </div>
      
    </div>
  );
};
