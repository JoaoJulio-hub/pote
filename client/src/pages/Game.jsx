import React from "react"
import Board from "../Components/Board.jsx"
import EuroIcon from "@mui/icons-material/Euro"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"

function Game({ socket, setBoard }) {
  return (
    <div>
      <div className="flex mb-10 text-5xl mb-6 cursor-pointer text-white items-center">
        <span>P</span>
        <FiberManualRecordIcon className="text-yellow-400 !h-12 !w-12 mt-2" />

        <span>T</span>
        <EuroIcon className="text-green-400 !h-11 !w-11 mt-1" />
        <span></span>
      </div>

      <Board board={setBoard} />
      <div>
        <button>Line</button>
        <button>Pote</button>
      </div>
    </div>
  )
}

export default Game
