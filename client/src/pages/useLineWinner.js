import { useEffect } from "react"
import socket from "../socket.js"

function useLineWinner(lineWinner, setLineWinner) {
  useEffect(() => {
    if (lineWinner === "") {
      // check if lineWinner is an empty string
      socket.on("send_line_winner", (data) => {
        const { username } = data
        setLineWinner(username)
      })

      // Clean up the event listeners on unmount
      return () => {
        socket.off("send_line_winner")
      }
    }
  }, [lineWinner, setLineWinner, socket]) // pass lineWinner and setLineWinner as dependencies
}

export default useLineWinner
