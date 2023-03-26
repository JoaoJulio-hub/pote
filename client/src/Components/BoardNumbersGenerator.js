export function generator() {
  let line1 = new Array(9)
  let line2 = new Array(9)
  let line3 = new Array(9)
  for (let i = 0; i < 9; i++) {
    line1[i] = 0
    line2[i] = 0
    line3[i] = 0
  }

  let numbers = [line1, line2, line3]

  let numbersGenerated = []
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

  let hasAllRanges = false
  //Generate the numbers for each line in the array of lines
  while (!hasAllRanges) {
    for (let i = 0; i < numbers.length; i++) {
      let countsPerLine = {
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
      for (let j = 0; j < 5; j++) {
        let number = 0
        let firstNumberOfTheRange = 0
        let lastNumberOfTheRange = 0
        let rangeOfTheNumber = ""
        let keepRunning = 1
        while (keepRunning == 1) {
          number = randomInRange(1, 89)
          firstNumberOfTheRange = Math.floor(number / 10) * 10
          lastNumberOfTheRange = Math.floor(number / 10) * 10 + 9
          rangeOfTheNumber = firstNumberOfTheRange + "-" + lastNumberOfTheRange
          let numberWasGenerated = numbersGenerated.includes(number)
          if (
            numberWasGenerated ||
            number == 0 ||
            countsPerLine[rangeOfTheNumber] >= 1 ||
            counts[rangeOfTheNumber] == 3
          ) {
          } else {
            keepRunning = 0
          }
        }
        if (number >= 0 && number <= 9) {
          numbers[i][0] = number
        } else if (number >= 10 && number <= 19) {
          numbers[i][1] = number
        } else if (number >= 20 && number <= 29) {
          numbers[i][2] = number
        } else if (number >= 30 && number <= 39) {
          numbers[i][3] = number
        } else if (number >= 40 && number <= 49) {
          numbers[i][4] = number
        } else if (number >= 50 && number <= 59) {
          numbers[i][5] = number
        } else if (number >= 60 && number <= 69) {
          numbers[i][6] = number
        } else if (number >= 70 && number <= 79) {
          numbers[i][7] = number
        } else if (number >= 80 && number <= 89) {
          numbers[i][8] = number
        }
        numbersGenerated.push(number)
        countsPerLine[rangeOfTheNumber]++
        counts[rangeOfTheNumber]++
      }
    }

    let numberOfRanges = 0
    for (const key in counts) {
      if (counts[key] > 0) {
        numberOfRanges++
      }
    }

    if (numberOfRanges == 9) {
      hasAllRanges = true
    } else {
      //clean and rerun
      line1 = new Array(9)
      line2 = new Array(9)
      line3 = new Array(9)
      for (let i = 0; i < 9; i++) {
        line1[i] = 0
        line2[i] = 0
        line3[i] = 0
      }

      numbers = [line1, line2, line3]
      numbersGenerated = []
      counts = {
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
    }
  }
  return numbers
}

// Define a function to generate a random number within a specified range
function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
