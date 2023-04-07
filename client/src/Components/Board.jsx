import React from "react"
import Square from "./Square"

function Board({ board }) {
  const boardWithNoSquares = board
  const boardWithSquares = boardWithNoSquares.map((squareNumbersArr) =>
    squareNumbersArr.map((square) => <Square number={square} />)
  )

  return (
    <div className="grid grid-cols-9 gap-x-5">
      {boardWithSquares.map((squareNumbersArr) =>
        squareNumbersArr.map((component) => <div>{component}</div>)
      )}
    </div>
  )
}

export default Board
