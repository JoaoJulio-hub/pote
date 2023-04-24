function areSquaresClickedInLine(clickedSquares, lineIndex) {
  const board = [
    [1, 10, 20, 40, 50],
    [60, 70, 80, 3, 22],
    [55, 13, 78, 12, 21],
  ]
  const lineSquares = board[lineIndex]
  for (let i = 0; i < lineSquares.length; i++) {
    const square = lineSquares[i]
    if (!clickedSquares.includes(square)) {
      return false
    }
  }
  return true
}

console.log(
  areSquaresClickedInLine([1, 10, 20, 40, 50], 0) ||
    areSquaresClickedInLine([1, 10, 20, 40, 50], 1) ||
    areSquaresClickedInLine([1, 10, 20, 40, 50], 2)
)
