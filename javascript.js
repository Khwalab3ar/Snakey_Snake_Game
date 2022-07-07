const gameArena = document.querySelector('section')
const newSnake = []
const snake = []
const arrow = 'Arrow'
const gridSize = 784
const centerSnake = gridSize / 2 + 14
let deleteSnake = 0
let foodEaten = false
let addedSnake = centerSnake
let rando = false
let animate = null
let direction = ''

for (let i = 0; i < gridSize; i++) {
  const createDiv = document.createElement('div')
  //delete later V
  createDiv.style.backgroundColor = '#f19c4d'
  createDiv.setAttribute(`id`, `box${i}`)
  gameArena.appendChild(createDiv)
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
const foodLocation = () => {
  let randNum = Math.floor(Math.random() * gridSize)
  while (rando === false) {
    snake.forEach((n) => {
      rando = false
      if (randNum === n) {
        rando = false
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
}
const animateSnake = (direction) => {
  switch (direction) {
    case 'up':
      addedSnake -= 28
      growOrMove(addedSnake)
      break
    case 'down':
      addedSnake += 28
      growOrMove(addedSnake)
      break
    case 'left':
      addedSnake--
      growOrMove(addedSnake)
      break
    case 'right':
      addedSnake++
      growOrMove(addedSnake)
      break
    default:
      ''
  }
}
const arrowKeyPressed = (e) => {
  direction = e.code.replace('Arrow', '').toLowerCase()
  console.log(direction)
  clearInterval(animate)
  animate = setInterval(function () {
    animateSnake(direction)
  }, 125)
}
snakeSize()
foodLocation()
window.addEventListener('keydown', arrowKeyPressed)
