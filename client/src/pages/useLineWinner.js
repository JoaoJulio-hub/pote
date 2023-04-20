import { useEffect, useState } from "react"
import socket from "../socket.js"

function useLineWinner() {
  const [lineWinner, setLineWinner] = useState("") // Move the useState hook to the top level

  useEffect(() => {
    socket.on("send_line_winner", (data) => {
      const { username } = data
      setLineWinner(username)
    })

    // Clean up the event listener when component unmounts
    return () => {
      socket.off("send_line_winner")
    }
  }, [])

  // Return the poteWinner state and any other logic or functions you need
  return lineWinner
}

export default useLineWinner
