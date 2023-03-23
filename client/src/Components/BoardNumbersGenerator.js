// Define an array to store the random numbers
let numbers = []

// Define an object to store the count of numbers in each range (0-9 ranges is actually 1-9 but to simplify the calculations it will stay this way)
let counts = {
  "0-9": 0,
  "10-19": 0,
  "20-29": 0,
  "30-39": 0,
  "40-49": 0,
  "50-59": 0,
  "60-69": 0,
  "70-79": 0,
  "80-89": 0,
}

// Generate one number from the first range
let firstRangeNumber = randomInRange(1, 9)
numbers.push(firstRangeNumber)
counts[0 + "-" + 9]++

// Generate one number from each other range first
for (let rangeStart = 10; rangeStart <= 80; rangeStart += 10) {
  let number = randomInRange(rangeStart, rangeStart + 9)
  numbers.push(number)
  counts[rangeStart + "-" + (rangeStart + 9)]++
}

// Generate the remaining random numbers
let addedNumbers = 0
while (numbers.length < 15) {
  let number = randomInRange(1, 89)
  let firstNumberOfTheRange = Math.floor(number / 10) * 10
  let lastNumberOfTheRange = Math.floor(number / 10) * 10 + 9
  let rangeOfTheNumber = firstNumberOfTheRange + "-" + lastNumberOfTheRange
  if (!numbers.includes(number) && counts[rangeOfTheNumber] < 2) {
    // Add the number to the array and increment the count for its range
    numbers.push(number)
    counts[rangeOfTheNumber]++
  }
}

// Define a function to generate a random number within a specified range
function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Initialize sub-arrays of each range
const subArray1 = []
const subArray2 = []
const subArray3 = []
const subArray4 = []
const subArray5 = []
const subArray6 = []
const subArray7 = []
const subArray8 = []
const subArray9 = []

// Iterate over original array and place each number into the appropriate sub-array based on its value range
for (let i = 0; i < numbers.length; i++) {
  const num = numbers[i]
  if (num >= 1 && num <= 9) {
    subArray1.push(num)
  } else if (num >= 10 && num <= 19) {
    subArray2.push(num)
  } else if (num >= 20 && num <= 29) {
    subArray3.push(num)
  } else if (num >= 30 && num <= 39) {
    subArray4.push(num)
  } else if (num >= 40 && num <= 49) {
    subArray5.push(num)
  } else if (num >= 50 && num <= 59) {
    subArray6.push(num)
  } else if (num >= 60 && num <= 69) {
    subArray7.push(num)
  } else if (num >= 70 && num <= 79) {
    subArray8.push(num)
  } else if (num >= 80 && num <= 89) {
    subArray9.push(num)
  }
}

// Combine the sub-arrays into a new array
const subArrays = [
  subArray1,
  subArray2,
  subArray3,
  subArray4,
  subArray5,
  subArray6,
  subArray7,
  subArray8,
  subArray9,
]

console.log(subArrays)
