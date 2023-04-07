import React, { useState } from "react"
import io from "socket.io-client"

const socket = io("http://localhost:3001")

function CreateGame() {
  const [room, setRoom] = useState("")
  const [nrPlayers, setNrPlayers] = useState(0)
  const createRoom = () => {
    if (room !== "" && nrPlayers > 1) {
      socket.emit("create_room", room, nrPlayers)
    }
  }
  return (
    <div>
      <h4>Create Game</h4>
      <input
        placeholder="Name of the room"
        value={room}
        onChange={(e) => {
          setRoom(e.target.value)
        }}
      />
      <input
        placeholder="Number of players"
        value={nrPlayers}
        onChange={(e) => {
          setNrPlayers(e.target.value)
        }}
      />
      <button onClick={createRoom}>Create Game</button>
    </div>
  )
}

export default CreateGame
