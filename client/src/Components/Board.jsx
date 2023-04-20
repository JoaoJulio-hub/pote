import React, { useState } from "react"
import Square from "./Square"
import { v4 as uuidv4 } from "uuid"
import socket from "../socket.js"
import useNumberReceiver from "../pages/useNumberReceiver"

function Board({ board, room, username }) {
  const [scoreBoard, setScoreBoard] = useState([])
  useNumberReceiver(scoreBoard, setScoreBoard) // Call the custom hook with the setScoreBoard function to update state

  const [start, setStart] = useState(false)
  const [clickedSquares, setClickedSquares] = useState([])
  const [boardWithSquares, setBoardWithSquares] = useState(
    board.map((squareNumbersArr) =>
      squareNumbersArr.map((square) => (
        <Square
          key={uuidv4()}
          number={square}
          onClick={(clickedSquare) => {
            setClickedSquares([...clickedSquares, clickedSquare])
          }}
        />
      ))
    )
  )

  function areSquaresClickedInLine(lineIndex) {
    const lineSquares = board[lineIndex]
    for (let i = 0; i < lineSquares.length; i++) {
      const square = lineSquares[i]
      if (!clickedSquares.includes(square)) {
        return false
      }
    }
    return true
  }

  const startGame = () => {
    setStart(true)
    socket.emit("start_game", { room: room })
  }

  const hasLine = () => {
    let found =
      areSquaresClickedInLine(0) ||
      areSquaresClickedInLine(1) ||
      areSquaresClickedInLine(2)

    if (found) {
      socket.emit("line_winner", { username: username, room: room })
    }
  }

  const hasPote = () => {
    if (clickedSquares.length === 15) {
      socket.emit("pote_winner", { username: username, room: room })
    }
  }

  return (
    <div className="flex-col">
      <div className="flex flex-wrap">
        <div className="flex-grow-1 max-w-1/9 border-2 border-black">
          <div className="grid grid-cols-9 gap-0">{boardWithSquares}</div>
        </div>
      </div>
      {!start ? (
        <div className="flex mt-10 justify-center">
          <button
            onClick={startGame}
            className="bg-yellow-600 text-white px-4 py-2  rounded "
          >
            Start
          </button>
        </div>
      ) : (
        <div className="flex mt-10 justify-center">
          <button
            onClick={hasLine}
            className="w-36 h-36 border-white font-bold rounded-full bg-red-500 border-2"
          >
            Line
          </button>
          <button
            onClick={hasPote}
            className="ml-8 w-36 h-36 border-white font-bold rounded-full bg-teal-400 border-2"
          >
            Pote
          </button>
        </div>
      )}
    </div>
  )
}

export default Board
