import React, { useState } from "react"

function Square({ number }) {
  const [clicked, setClicked] = useState(false)

  const bingoSquare = () => {
    return (
      <div className="w-24 h-24 text-center border-2 border-black bg-red-600">
        Bingo
      </div>
    )
  }

  const normalSquare = (number) => {
    return (
      <div
        onClick={handleClick}
        className="w-24 h-24 border-2 border-black text-center border-2 border-black bg-red-600"
      >
        {number}
      </div>
    )
  }

  const handleClick = () => {
    setClicked(true)
  }

  return number > 0 ? normalSquare(number) : bingoSquare()
}

export default Square
