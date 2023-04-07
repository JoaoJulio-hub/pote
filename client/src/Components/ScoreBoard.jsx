import React from "react"

function ScoreBoard() {
  const divs = []

  for (let i = 1; i <= 89; i++) {
    const div = (
      <div
        key={i}
        className="bg-white rounded-lg shadow-md flex items-center justify-center h-20"
      >
        <span className="text-3xl">{i}</span>
      </div>
    )
    divs.push(div)
  }

  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-9 gap-4">{divs}</div>
    </div>
  )
}

export default ScoreBoard
