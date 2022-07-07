const gameArena = document.querySelector('section')
const snake = []
const gridSize = 784
const centerSnake = gridSize / 2 + 14
let deleteSnake = 0 //What is this for?
let foodEaten = false
let addedSnake = centerSnake
let rando = false
let animate = null
let direction = ''
let lastDirection = ''

for (let i = 0; i < gridSize; i++) {
  const createDiv = document.createElement('div')
  //delete later V
  if (i % 28 === 27 || i % 28 === 0 || i < 28 || i > 756) {
    createDiv.style.backgroundColor = '#000'
  } else {
    createDiv.style.backgroundColor = '#f19c4d'
  }
  createDiv.setAttribute('class', 'board')
  createDiv.setAttribute(`id`, `box${i}`)
  gameArena.appendChild(createDiv)
}
//Ways to lose game, touch border, or self
const restraint = () => {
  if (
    snake[0] % 28 === 27 ||
    snake[0] % 28 === 0 ||
    snake[0] < 28 ||
    snake[0] > 756
  ) {
    clearInterval(animate)
    gameOver()
    return true
  } else if (snake.length > 3) {
    for (let i = 0; i < snake.length; i++) {
      if (i > 3) {
        if (snake[0] === snake[i]) {
          clearInterval(animate)
          gameOver()
          return true
        } else {
          ;('')
        }
      } else {
        ;('')
      }
    }
  } else {
    ;('')
  }
}

const snakeSize = () => {
  if (snake.length === 0) {
    snake.push(centerSnake)
  }
  for (let i = 0; i < snake.length; i++) {
    const locationSquare = document.querySelector(`#box${snake[i]}`)
    locationSquare.style.backgroundColor = '#fff'
    locationSquare.style.borderRadius = ''
  }
}
// figure out why it stops? change range of random to smaller
const foodLocation = () => {
  let randNum = Math.floor(Math.random() * gridSize)
  while (rando === false) {
    snake.forEach((n) => {
      rando = false
      if (randNum === n) {
        rando = false
        randNum = Math.floor(Math.random() * gridSize)
      } else if (
        randNum % 28 === 27 ||
        randNum % 28 === 0 ||
        randNum < 28 ||
        randNum > 756
      ) {
        rando = false
        randNum = Math.floor(Math.random() * gridSize)
      } else {
        rando = true
      }
    })
  }
  food = randNum
  locationSquare = document.querySelector(`#box${randNum}`)
  locationSquare.style.backgroundColor = '#4f7d5b'
  locationSquare.style.borderRadius = '50%'
}

const growOrMove = (addedSnake) => {
  if (snake[snake.length - 1] === food) {
    foodEaten = true
    foodLocation()
  } else {
    foodEaten = false
  }
  if (foodEaten) {
    foodEaten = false
    snake.push(addedSnake)
  } else {
    snake.push(addedSnake)
    locationSquare = document.querySelector(`#box${snake.shift()}`)
    locationSquare.style.backgroundColor = '#f19c4d'
    locationSquare.style.borderRadius = ''
  }
  snakeSize()
  restraint()
}
const animateSnake = (direction) => {
  switch (direction) {
    case 'up':
      if (lastDirection === 'down') {
        return
      } else {
        addedSnake -= 28
        growOrMove(addedSnake)
      }
      break
    case 'down':
      if (lastDirection === 'up') {
        return
      } else {
        addedSnake += 28
        growOrMove(addedSnake)
      }
      break
    case 'left':
      if (lastDirection === 'right') {
        return
      } else {
        addedSnake--
        growOrMove(addedSnake)
      }
      break
    case 'right':
      if (lastDirection === 'left') {
        return
      } else {
        addedSnake++
        growOrMove(addedSnake)
      }
      break
    default:
      ''
  }
  lastDirection = direction
  console.log(lastDirection)
}
const arrowKeyPressed = (e) => {
  direction = e.code.replace('Arrow', '').toLowerCase()
  clearInterval(animate)
  animate = setInterval(function () {
    animateSnake(direction)
  }, 125)
}

const gameOver = () => {
  alert('GAME OVER')
  let board = document.querySelectorAll('.board')
  board.forEach((b) => {
    b.style.opacity = '0'
  })
  window.removeEventListener('keydown', arrowKeyPressed)
}

snakeSize()
foodLocation()
window.addEventListener('keydown', arrowKeyPressed)
