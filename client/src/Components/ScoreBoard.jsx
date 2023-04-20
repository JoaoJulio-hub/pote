import React from "react"
import { useState, useEffect } from "react"
import socket from "../socket.js"

function ScoreBoard() {
  const [scoreBoard, setScoreBoard] = useState([])
  const divs = []

  for (let i = 1; i <= 89; i++) {
    const div = scoreBoard.includes(i) ? (
      <div key={i} className="mr-2">
        <span className="font-semibold text-red-400">{i}</span>
      </div>
    ) : (
      <div key={i} className="mr-2">
        <span className="font-semibold">{i}</span>
      </div>
    )
    divs.push(div)
  }

  useEffect(() => {
    socket.on(
      "send_number",
      (data) => {
        setScoreBoard([...scoreBoard, data.number])
      },
      [scoreBoard]
    )

    // Clean up the event listener when component unmounts
    return () => {
      socket.off("send_number")
    }
  }, [scoreBoard])

  return (
    <div className="w-fit h-fit rounded-lg border-4 border-yellow-900">
      <div className="grid grid-cols-9 gap-0 p-1">{divs}</div>
    </div>
  )
}

export default ScoreBoard
