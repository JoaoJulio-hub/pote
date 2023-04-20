import React, { useState } from "react"
import useLineWinner from "../pages/useLineWinner"
import usePoteWinner from "../pages/usePoteWinner"
usePoteWinner

function Winners() {
  const [lineW, setLineW] = useState("")
  const [poteW, setPoteW] = useState("")
  setLineW(useLineWinner())
  setPoteW(usePoteWinner())

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Line Winner: {lineW}</h2>
      <h2 className="text-2xl font-bold">Bingo Winner: {poteW}</h2>
    </div>
  )
}

export default Winners
