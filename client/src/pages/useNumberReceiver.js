// custom hook for receiving numbers from the server
import { useEffect } from "react"
import socket from "../socket.js"

function useNumberReceiver(scoreBoard, setScoreBoard) {
  useEffect(() => {
    socket.on("send_number", (data) => {
      setScoreBoard([...scoreBoard, data.number])
    })

    // Clean up the event listener when component unmounts
    return () => {
      socket.off("send_number")
    }
  }, [scoreBoard])

  return scoreBoard
}

export default useNumberReceiver
