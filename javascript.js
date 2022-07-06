const gameArena = document.querySelector('section')
const food = document.querySelector('.food')
const newSnake = []
const snake = []
const arrow = 'Arrow'
const foodEaten = false
const gridSize = 784
const centerSnake = gridSize / 2 + 14
let addedSnake = centerSnake

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
    boxId = snake
    const snakeSquare = document.querySelector(`#box${snake[i]}`)
    snakeSquare.style.backgroundColor = '#fff'
  }
}

const upArrowPressed = () => {
  addedSnake -= 28
  growOrMove(addedSnake)
}

const downArrowPressed = () => {
  addedSnake += 28
  growOrMove(addedSnake)
}

const leftArrowPressed = () => {
  addedSnake--
  growOrMove(addedSnake)
}

const rightArrowPressed = () => {
  addedSnake++
  growOrMove(addedSnake)
}
const growOrMove = (addedSnake) => {
  if (foodEaten) {
    ;('')
  } else {
    for (let i = 0; i < snake.length; i++) {
      snakeSquare = document.querySelector(`#box${snake[i]}`)
      snakeSquare.style.backgroundColor = '#f19c4d'
      snake[i] = addedSnake
    }
  }
  snakeSize()
}

const arrowKeyPressed = (e) => {
  arrowKey = e.code
  switch (arrowKey) {
    case arrow + 'Up':
      upArrowPressed()
      break
    case arrow + 'Down':
      downArrowPressed()
      break
    case arrow + 'Left':
      leftArrowPressed()
      break
    case arrow + 'Right':
      rightArrowPressed()
      break
    default:
      return
  }
}
snakeSize()
window.addEventListener('keydown', arrowKeyPressed)
