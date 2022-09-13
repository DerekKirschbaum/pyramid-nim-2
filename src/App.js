import React from 'react'
import Line from './Line'
import BlackLine from './Images/BlackLine.jpg'
import BlueCrossedLine from './Images/BlueCrossedLine.jpg'
import RedCrossedLine from './Images/RedCrossedLine.jpg'


export default function App () {

  const [lines, setLines] = React.useState(newLines())


  function newLines () {
    const list = []
    for(let i=0; i<15; i++){
      list.push({
        key: i+1,
        id: i + 1,
        isCrossed: false,
        redPlayer: true,
        src: BlackLine,
        canChange: true
      })
    }
    let count = 0
    for(let i=1; i<6; i++) {
      for(let j=0; j<i; j++){
        list[count].row = i
        count++
      }
    }
    return list
  }

  function crossLine (id) {
    setLines(oldLines => oldLines.map(line => 
        line.id === id && line.canChange? 
          {...line, isCrossed: !line.isCrossed} : 
          line
      ))
  }

  function nextTurn () {
    setLines(oldLines => oldLines.map(line => 
        line.isCrossed ? 
          {...line, redPlayer: !line.redPlayer, canChange: !line.canChange} :
          line
      ))
  }

  const lineElements = (lines.map(line => 
    <Line 
      key={line.id}
      id={line.id}
      isCrossed={line.isCrossed}
      redPlayer={line.redPlayer}
      src={line.src}
      row={line.row}
      canChange={line.canChange}
      crossLine={() => crossLine(line.id)}
    />
    ))


  return (
    <main>
      <div className='main'>
        <div className='header'>
          <h1 className='title'>Pyramid Nim</h1>
          <p className='instructions'>Players alternate turns, crossing off as many 
            adjacent lines in the same row as they want. 
            The winner is the player that crosses off the last line.
          </p>
        </div>
        <div className='gameBox'>
          <div className='row1'>
            {lineElements[0]}
          </div>
          <div className='row2'>
            {lineElements[1]}
            {lineElements[2]}

          </div>
          <div className='row3'>
            {lineElements[3]}
            {lineElements[4]}
            {lineElements[5]}
          </div>
          <div className='row4'>
            {lineElements[6]}
            {lineElements[7]}
            {lineElements[8]}
            {lineElements[9]}
          </div>
          <div className='row5'>
            {lineElements[10]}
            {lineElements[11]}
            {lineElements[12]}
            {lineElements[13]}
            {lineElements[14]}
          </div>
        </div>
        <button className='nextTurn' onClick={nextTurn}>
          Next Turn
        </button>
        
      </div>
    </main>
  );
};
