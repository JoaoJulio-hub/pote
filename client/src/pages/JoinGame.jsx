import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Board from "../Components/Board.jsx"
import ScoreBoard from "../Components/ScoreBoard.jsx"
import Winners from "../Components/Winners.jsx"
import socket from "../socket.js"
import { useCookies } from "react-cookie"

const username = localStorage.getItem("username")

function JoinGame() {
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies(["access_token"])

  const [room, setRoom] = useState("")
  const [showGame, setShowGame] = useState(false)
  const [boardGame, setBoardGame] = useState([])

  const logout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    window.localStorage.removeItem("username")
    navigate("/login")
  }

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
        <div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg m-2 py-2 px-4"
          >
            Logout
          </button>
          <div className="flex flex-col items-center justify-center mt-8 min-h-screen">
            <h4 className="text-lg font-bold mb-4">Join Game</h4>
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
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={joinRoom}
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-200">
          <div className="flex p-4 justify-start">
            <button
              className="bg-red-900 text-white px-4 py-2 rounded h-fit"
              onClick={leaveRoom}
            >
              Leave room
            </button>
          </div>
          <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="flex justify-center item mt-6">
              <Board room={room} board={boardGame} username={username} />
              <div className="flex flex-col">
                <div className="ml-10">
                  <ScoreBoard />
                </div>
                <div className="ml-28 mt-4">
                  <Winners />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JoinGame
