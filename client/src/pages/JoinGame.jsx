import React, { useState } from "react"
import io from "socket.io-client"
import { useNavigate } from "react-router-dom"
import Game from "./Game"

const socket = io("http://localhost:3001")

function JoinGame() {
  const navigate = useNavigate()
  const [room, setRoom] = useState("")
  const [showGame, setShowGame] = useState(false)
  const [boardGame, setBoardGame] = useState([])
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room)
      setShowGame(true)
      socket.on("send_board", (data) => {
        setBoardGame(data)
      })
    }
    console.log(boardGame)
  }

  const leaveRoom = () => {
    socket.emit("leave_room", room, socket.id)
  }

  return (
    <div>
      {!showGame ? (
        <div>
          <h4>Create Game</h4>
          <input
            placeholder="Name of the room"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value)
            }}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <div>
          <button onClick={leaveRoom}>Leave room</button>
          <Game setBoard={boardGame} />
        </div>
      )}
    </div>
  )
}

export default JoinGame
