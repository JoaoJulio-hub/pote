import io from "socket.io-client"

const username = localStorage.getItem("username")

const socket = io.connect("https://pote-eight.vercel.app/", {
  reconnection: false,
  query: { userId: username }, // Pass the unique identifier as a query parameter
})

export default socket
