import React from "react"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import socket from "../socket"

function LastNumbers() {
  const [lastThreeNumbers, setLastThreeNumbers] = useState([])

  useEffect(() => {
    socket.on("send_number", (data) => {
      // Update lastThreeNumbers state with the latest number at the beginning
      setLastThreeNumbers((prevLastThreeNumbers) => [
        data.number,
        ...prevLastThreeNumbers.slice(0, 2),
      ])
    })

    // Clean up the event listener when component unmounts
    return () => {
      socket.off("send_number")
    }
  }, [lastThreeNumbers]) // Empty dependency array to only run the effect on mount and unmount

  return (
    <div className="flex ml-16">
      {lastThreeNumbers.map((number) => (
        <div key={uuidv4()} className="mr-2">
          <div className="w-28 h-28 border-black font-bold rounded-full bg-green-400 border-2 flex items-center justify-center">
            <span>{number}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LastNumbers
