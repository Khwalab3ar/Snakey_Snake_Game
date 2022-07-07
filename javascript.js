const gameArena = document.querySelector('.game-area')
const resetBtn = document.querySelector('#reset')
const gridSize = 784
const centerSnake = gridSize / 2 + 14
const level = document.querySelector('#level')
const score = document.querySelector('#score')
const gameOverSceen = document.querySelector('.game-done')
const noGoSquares = []
let playerScore = 0
let playerLevel = 1
let count = 0
let snake = []
let deleteSnake = 0 //What is this for?
let foodEaten = false
let addedSnake = centerSnake
let rando = false
let animate = null
let direction = ''
let lastDirection = ''
let speed = 125
let pointInterval = 5

for (let i = 0; i < gridSize; i++) {
  const createDiv = document.createElement('div')
  //delete later V
  if (i % 28 === 27 || i % 28 === 0 || i < 28 || i > 756) {
    createDiv.style.backgroundColor = '#edae6f'
    createDiv.setAttribute('class', 'board no-go')
  } else {
    createDiv.setAttribute('class', 'board')
  }
  createDiv.setAttribute(`id`, `box${i}`)
  gameArena.appendChild(createDiv)
}
score.innerHTML = `Score :  ${playerScore}`
level.innerHTML = `Level : ${playerLevel}`
// grabs all create div boxes
// will try and use to make code simplier ***future
const board = document.querySelectorAll('.board')
const noGo = document.querySelectorAll('.no-go')
noGo.forEach((no) => {
  let boxNum = no.getAttribute('id')
  boxNum = boxNum.replace('box', '')
  noGoSquares.push(boxNum)
})

//Ways to lose game, touch border, or self
const restraint = () => {
  if (
    snake[snake.length - 1] % 28 === 27 ||
    snake[snake.length - 1] % 28 === 0 ||
    snake[snake.length - 1] < 28 ||
    snake[snake.length - 1] > 756
  ) {
    clearInterval(animate)
    gameOver()
    return true
  } else if (snake.length > 3) {
    // Game end when snake touch itself
    for (let i = 0; i < snake.length; i++) {
      if (i > 3) {
        if (snake[snake.length - 1] === snake[i] && i != snake.length - 1) {
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
  snake.forEach((n) => {
    rando = false
    while (rando === false) {
      if (n === randNum) {
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
    }
  })
  food = randNum
  locationSquare = document.querySelector(`#box${randNum}`)
  locationSquare.style.backgroundColor = '#081336'
  locationSquare.style.borderRadius = '50%'
}

const growOrMove = (addedSnake) => {
  if (snake[snake.length - 1] === food) {
    foodEaten = true
    count++
    scoreOrLevel()
    score.innerHTML = `Score:  ${playerScore}`
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
    locationSquare.style.backgroundColor = '#c75136'
    locationSquare.style.borderRadius = ''
  }
  snakeSize()
  restraint()
}
const animateSnake = (direction) => {
  switch (direction) {
    case 'up':
      if (lastDirection === 'down') {
        animateSnake('down')
      } else {
        lastDirection = direction
        addedSnake -= 28
        growOrMove(addedSnake)
      }
      break
    case 'down':
      if (lastDirection === 'up') {
        animateSnake('up')
      } else {
        lastDirection = direction
        addedSnake += 28
        growOrMove(addedSnake)
      }
      break
    case 'left':
      if (lastDirection === 'right') {
        animateSnake('right')
      } else {
        lastDirection = direction
        addedSnake--
        growOrMove(addedSnake)
      }
      break
    case 'right':
      if (lastDirection === 'left') {
        animateSnake('left')
      } else {
        lastDirection = direction
        addedSnake++
        growOrMove(addedSnake)
      }
      break
    default:
      ''
  }
}
const arrowKeyPressed = (e) => {
  direction = e.code.replace('Arrow', '').toLowerCase()
  clearInterval(animate)
  animate = setInterval(function () {
    animateSnake(direction)
  }, speed)
}

const scoreOrLevel = () => {
  if (count === 4) {
    speed -= 5
    playerLevel++
    level.innerHTML = `Level : ${playerLevel}`
    pointInterval += 5
    count = 0
    playerScore = 0
  } else {
    playerScore += pointInterval
  }
  score.innerHTML = `Score :  ${playerScore}`
}
const gameOver = () => {
  board.forEach((b) => {
    b.style.opacity = '0'
  })
  gameOverSceen.style.opacity = '1'
  window.removeEventListener('keydown', arrowKeyPressed)
}

const reset = () => {
  foodEaten = false
  addedSnake = centerSnake
  rando = false
  animate = null
  direction = ''
  snake = []
  playerScore = 0
  playerLevel = 0
  gameOverSceen.style.opacity = '0'
  speed = 125
  pointInterval = 5
  score.innerHTML = `Score :  ${playerScore}`
  level.innerHTML = `Level : ${playerLevel}`
  for (let i = 0; i < gridSize; i++) {
    const box = document.querySelector(`#box${i}`).style
    if (i % 28 === 27 || i % 28 === 0 || i < 28 || i > 756) {
      box.backgroundColor = '#edae6f'
    } else {
      box.backgroundColor = ''
    }
    box.opacity = '1'
    box.borderRadius = ''
    window.addEventListener('keydown', arrowKeyPressed)
  }
  snakeSize()
  foodLocation()
}

snakeSize()
foodLocation()
window.addEventListener('keydown', arrowKeyPressed)
resetBtn.addEventListener('click', reset)
