import React, { useState } from "react"

function Square(number) {
  const [clicked, setClicked] = useState(false)

  const bingoSquare = () => {
    return <div className="w-24 h-24 bg-red-600">Bingo</div>
  }

  const normalSquare = (number) => {
    return (
      <div onClick={handleClick} className="w-24 h-24 bg-red-600">
        {number}
      </div>
    )
  }

  const handleClick = () => {
    setClicked(true)
  }

  return () => {
    if (number) {
      normalSquare
    } else {
      bingoSquare
      setClicked(true)
    }
  }
}

export default Square
