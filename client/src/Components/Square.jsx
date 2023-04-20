import React, { useState } from "react"
import "./Square.css"
import useNumberReceiver from "../pages/useNumberReceiver"

function Square({ number, onClick }) {
  const [clicked, setClicked] = useState(false)
  const [scoreBoard, setScoreBoard] = useState([])
  useNumberReceiver(scoreBoard, setScoreBoard) // Call the custom hook with the setScoreBoard function to update state

  const handleClick = (e) => {
    if (scoreBoard.includes(number) && !clicked && scoreBoard.length !== 0) {
      setClicked(true)
      onClick(number)
      e.target.classList.add("clicked")
    }
  }

  const squareClassName = `square ${clicked ? "clicked" : ""}`

  return (
    <div
      className={`${squareClassName} flex w-24 h-24 ml-0 border-2 border-black bg-green-700 justify-center items-center relative`}
    >
      {number > 0 ? (
        <span onClick={handleClick} className="text-white">
          {number}
        </span>
      ) : (
        <span className="text-white">Pote</span>
      )}
      {clicked && (
        <div className="absolute w-full h-full">
          <div className="square clicked::before"></div>
        </div>
      )}
    </div>
  )
}

export default Square
