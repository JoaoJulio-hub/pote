// custom hook for receiving the pote winner from the server
import { useEffect } from "react"
import socket from "../socket.js"

function usePoteWinner(setPoteWinner) {
  useEffect(() => {
    socket.on("send_pote_winner", (data) => {
      const { username } = data
      setPoteWinner(username)
    })

    // Clean up the event listeners on unmount
    return () => {
      socket.off("send_pote_winner")
    }
  }, [socket])
}

export default usePoteWinner
