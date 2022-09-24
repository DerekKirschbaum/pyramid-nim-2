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
  const[redTurn, setRedTurn] = React.useState(true)
  const[invalidIdsList, setInvalidIdsList] = React.useState([])

  React.useEffect(() => {
    console.log("effect")
    const allCrossed = lines.every(line => !line.canChange)
    if(allCrossed) {
      setGameFinished(true)
    } else {
      setValidMove(false)
      let selectedLines = []
      let invalidIds = []
      for(let i =0; i<15; i++) {
        if(lines[i].turn === turn){
          selectedLines.push(lines[i])
        }
      }
      if(selectedLines.length > 0){
        setValidMove(true)
        const selectedRow = selectedLines[0].row
        for(let i=0; i<selectedLines.length; i++) {
          if(selectedLines[i].row !== selectedRow) {
            setValidMove(false)
            invalidIds.push(selectedLines[i].id)
          }
        }
        const minId = selectedLines[0].id
        const maxId = selectedLines[selectedLines.length-1].id
        for(let i=minId-1; i<maxId; i++) {
          if((lines[i].turn > 0) && (lines[i].turn !== selectedLines[0].turn)){
            setValidMove(false)
            invalidIds.push(selectedLines[i].id)
          }
        }
        //console.log(invalidIds)
        //setInvalidIdsList(
        //console.log("ivl: " + invalidIdsList)
        //infinite loop? fix this to make boxes red when move is invalid
        /*console.log(invalidIds)
        setLines(oldLines => oldLines.map(function(line) {
          for(let i=0; i<invalidIds.length; i++){ 
            if(line.id === invalidIds[i]){
              return {...line, highlightColor: true}
            }
          }
          return {...line}
        }))*/
        
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
        turn: 0,
        highlightColor: true
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
    if(gameFinished) {
      setGameFinished(false)
      setLines(newLines())
      setTurn(1)
      setRedTurn(true)
    } else if(validMove) {
      setTurn(oldTurn => oldTurn + 1)
      setRedTurn(oldRedTurn => !oldRedTurn)
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
      highlightColor={line.highlightColor}
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
            <button className="turn-info">
              <span className={redTurn ? 'red' : 'blue'}>
                {gameFinished ? (redTurn ? 'Red Player Wins!' : 'Blue Player Wins!') : redTurn ? "Red Player's Turn" : "Blue Player's Turn"}
              </span>
              <br/>
              {gameFinished ? ('Turns: ' + turn) : tryAgain ? 'Invalid Move' : ('Turn: ' + turn)}
            </button>
          </div>
        </div>
        
      </div>
    </main>
  );
};
