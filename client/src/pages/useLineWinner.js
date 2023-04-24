// custom hook for receiving the line winner from the server
import { useEffect } from "react"
import socket from "../socket.js"

function useLineWinner(lineWinner, setLineWinner) {
  useEffect(() => {
    if (lineWinner != "") {
      socket.on("send_line_winner", (data) => {
        const { username } = data
        setLineWinner(username)
      })

      // Clean up the event listeners on unmount
      return () => {
        socket.off("send_line_winner")
      }
    }
  }, [socket])
}

export default useLineWinner
