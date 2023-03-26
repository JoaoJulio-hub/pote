import React from "react"
import Square from "./Square"
import { generator } from "./BoardNumbersGenerator"

function Board() {
  const boardWithNoSquares = generator()
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
