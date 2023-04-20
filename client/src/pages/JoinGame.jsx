import React, { useState, useEffect } from "react"
import Board from "../Components/Board.jsx"
import ScoreBoard from "../Components/ScoreBoard.jsx"
import Winners from "../Components/Winners.jsx"
import socket from "../socket.js"

// Connect to the Socket.IO server
const username = localStorage.getItem("username")

function JoinGame() {
  const [room, setRoom] = useState("")
  const [showGame, setShowGame] = useState(false)
  const [boardGame, setBoardGame] = useState([])
  const [lineWinner, setLineWinner] = useState("")
  const [poteWinner, setPoteWinner] = useState("")

  const joinRoom = async () => {
    if (room !== "") {
      // Wrap the event listener in a Promise
      await new Promise((resolve) => {
        // Set the room state before emitting the "join_room" event
        setRoom(room)
        socket.emit("join_room", { room: room, userId: username })
        socket.on("send_board", (data) => {
          setBoardGame(data.board)
          resolve()
        })
      })

      // After the Promise resolves, set showGame to true
      setShowGame(true)
    }
  }

  const leaveRoom = () => {
    socket.emit("leave_room", room, username)
    setShowGame(false)
  }

  return (
    <div>
      {!showGame ? (
        <div className="flex flex-col items-center justify-center mt-8 min-h-screen">
          <h4 className="text-lg font-bold mb-4">Create Game</h4>
          <input
            className="border border-gray-400 rounded px-3 py-2 mb-4"
            type="text"
            placeholder="Name of the room"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value)
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
      ) : (
        <div className="flex-col bg-gray-200 min-h-screen">
          <div className="flex p-4 justify-start">
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded h-fit"
              onClick={leaveRoom}
            >
              Leave room
            </button>
          </div>
          <div className="flex justify-center item mt-6">
            <Board room={room} board={boardGame} username={username} />
            <div className="ml-10 mt-5">
              <ScoreBoard />
            </div>
            <div className="ml-10 mt-32">
              <Winners />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JoinGame
