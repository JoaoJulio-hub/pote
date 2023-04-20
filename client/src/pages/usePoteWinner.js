import { useEffect, useState } from "react"
import socket from "../socket.js"

function usePoteWinner() {
  const [poteWinner, setPoteWinner] = useState("") // Move the useState hook to the top level

  useEffect(() => {
    socket.on("send_pote_winner", (data) => {
      const { username } = data
      setPoteWinner(username)
    })

    // Clean up the event listener when component unmounts
    return () => {
      socket.off("send_pote_winner")
    }
  }, [])

  // Return the poteWinner state and any other logic or functions you need
  return poteWinner
}

export default usePoteWinner
