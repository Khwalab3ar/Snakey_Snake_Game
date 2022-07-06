const snake = document.querySelector('.snake')
const food = document.querySelector('.food')
const arrow = 'Arrow'
let movingSnake = true
let arrowKey = ''
//Vertical movement
let movementV = 0
//Horizontal movement
let movementH = 0
let moveDirection = ''

// Initial Snake
snake.style.top = `50%`
snake.style.left = `50%`
// Snake css top value
let snakeH = snake.style.top
snakeH = snakeH.replace('%', '')
// Snake css left value
let snakeV = snake.style.left
snakeV = snakeV.replace('%', '')

const upArrowPressed = () => {
  //movementV = snakeH--
  //snake.style.top = `${movementV}%`
  console.log('Pressed function')
  moving(snakeH, 'up')
}

const downArrowPressed = () => {
  //movementV = snakeH++
  //snake.style.top = `${movementV}%`
  moving(snakeH, 'down')
}

const leftArrowPressed = () => {
  //movementH = snakeV--
  //snake.style.left = `${movementH}%`
  moving(snakeV, 'left')
}

const rightArrowPressed = () => {
  //movementH = snakeV++
  //snake.style.left = `${movementH}%`
  moving(snakeV, 'right')
}

const stopMove = () => {
  console.log('sankey')
  movingSnake = false
}

const moving = (moving, direction) => {
  let i = 0
  while (movingSnake) {
    console.log('made it here')
    switch (direction) {
      case 'up':
        movementV = snakeH--
        setTimeout(() => {
          snake.style.top = `${movementV}%`
        }, 1000)
        window.addEventListener('keydown', stopMove)
        break
      case 'down':
        movementV = snakeH++
        setTimeout(() => {
          snake.style.top = `${movementV}%`
        }, 1000)
        window.addEventListener('keydown', stopMove)
        break
      case 'left':
        movementH = snakeV--
        setTimeout(() => {
          snake.style.left = `${movementH}%`
        }, 1000)
        window.addEventListener('keydown', stopMove)
        break
      case 'right':
        movementH = snakeV++
        setTimeout(() => {
          snake.style.left = `${movementH}%`
        }, 1000)
        window.addEventListener('keydown', stopMove)
        break
      default:
        ''
    }
  }
  movingSnake = true
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
window.addEventListener('keydown', arrowKeyPressed)
