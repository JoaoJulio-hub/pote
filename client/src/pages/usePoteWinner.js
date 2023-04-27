import { useEffect } from "react"
import socket from "../socket.js"

function usePoteWinner(poteWinner, setPoteWinner) {
  useEffect(() => {
    if (poteWinner === "") {
      // check if poteWinner is an empty string
      socket.on("send_pote_winner", (data) => {
        const { username } = data
        setPoteWinner(username)
      })

      // Clean up the event listeners on unmount
      return () => {
        socket.off("send_pote_winner")
      }
    }
  }, [poteWinner, setPoteWinner, socket]) // pass poteWinner and setPoteWinner as dependencies
}

export default usePoteWinner
