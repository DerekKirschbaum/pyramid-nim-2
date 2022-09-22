//check if certain moves are valid or not, don't let user enter nothing


import React from 'react'
import Line from './Line'
import BlackLine from './Images/BlackLine.jpg'
//import BlueCrossedLine from './Images/BlueCrossedLine.jpg'
//import RedCrossedLine from './Images/RedCrossedLine.jpg'


export default function App () {

  const [lines, setLines] = React.useState(newLines())
  const[gameFinished, setGameFinished] = React.useState(false)
  const[turn, setTurn] = React.useState(1)
  const[validMove, setValidMove] = React.useState(false)
  const[tryAgain, setTryAgain] = React.useState(false)

  React.useEffect(() => {
    console.log("effect")
    const allCrossed = lines.every(line => !line.canChange)
    if(allCrossed) {
      setGameFinished(true)
    } else {
      setValidMove(false)
      let selectedLines = []
      for(let i =0; i<15; i++) {
        if(lines[i].turn === turn){
          selectedLines.push(lines[i])
        }
      }
      console.log(selectedLines)
      if(selectedLines.length > 0){
        console.log("same row check")
        setValidMove(true)
        const selectedRow = selectedLines[0].row
        for(let i=0; i<selectedLines.length; i++) {
          if(selectedLines[i].row !== selectedRow) {
            setValidMove(false)
          }
        }
        //console.log("in row check")
        const minId = selectedLines[0].id
        const maxId = selectedLines[selectedLines.length-1].id
        for(let i=minId-1; i<maxId; i++) {
          if((lines[i].turn > 0) && (lines[i].turn !== selectedLines[0].turn)){
            setValidMove(false)
          }
        }
        

      }
    }

  }, [lines, turn] )


  function newLines () {
    const list = []
    for(let i=0; i<15; i++){
      list.push({
        key: i+1,
        id: i + 1,
        isCrossed: false,
        redPlayer: true,
        src: BlackLine,
        canChange: true,
        turn: 0
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
    setLines(oldLines => oldLines.map(function(line) {
      if(line.id === id && line.canChange) {
        if(line.isCrossed){
          return {...line, isCrossed: !line.isCrossed, turn: 0}
        } else {
          return {...line, isCrossed: !line.isCrossed, turn: turn}
        }
      } else {
        return {...line}
      }
    }))
  }

  function nextTurn () {
    console.log('nextTurn validMove: ' + validMove)
    if(gameFinished) {
      setGameFinished(false)
      setLines(newLines())
      setTurn(1)
    } else if(validMove) {
      setTurn(oldTurn => oldTurn + 1)
      setValidMove(false)
      setTryAgain(false)
      setLines(oldLines => oldLines.map(function(line) {
        if(line.canChange) {
          if(line.isCrossed) {
            return {...line, canChange: !line.canChange, turn: turn} 
          } else {
            return {...line, redPlayer: !line.redPlayer}
          }
        } else {
          return {...line}
        }
      }))
    } else {
      setTryAgain(true)
    }
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
      turn={line.turn}
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
          <div className="rows">
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
          <div className='nextTurnDiv'>
            <button className='nextTurn' onClick={nextTurn}>
              {gameFinished ? 'New Game' : 'Next Turn'}
            </button>
            <h2>{tryAgain ? 'Invalid Move' : ('Turn: ' + turn)}</h2>
          </div>
        </div>
        
      </div>
    </main>
  );
};
