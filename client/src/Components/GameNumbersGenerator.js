let arr = []

for (let i = 1; i <= 89; i++) {
  arr.push(i)
}

// Shuffle the array
for (let i = arr.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1))
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

// Take the first 89 elements
arr = arr.slice(0, 89)

console.log(arr)
