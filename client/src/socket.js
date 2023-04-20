import io from "socket.io-client"

const username = localStorage.getItem("username")

const socket = io.connect("http://localhost:3001", {
  reconnection: false,
  query: { userId: username }, // Pass the unique identifier as a query parameter
})

export default socket
