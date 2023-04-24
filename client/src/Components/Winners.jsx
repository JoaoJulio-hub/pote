import React, { useState } from "react"
import usePoteWinner from "../pages/usePoteWinner"
import useLineWinner from "../pages/useLineWinner"

function Winners() {
  const [poteWinner, setPoteWinner] = useState("")
  const [lineWinner, setLineWinner] = useState("")

  useLineWinner(lineWinner, setLineWinner)
  usePoteWinner(poteWinner, setPoteWinner)

  return (
    <div>
      <h2>Line Winner: {lineWinner}</h2>
      <h2>Bingo Winner: {poteWinner}</h2>
    </div>
  )
}

export default Winners
