const width = 20
const height = 10
const gameField = document.querySelector('.game-field')

const dangerList = []

for (let i = 1; i <= width * height; i++) {
    const fieldBlock = document.createElement('div')
    fieldBlock.setAttribute('id', `block-${i}`)
    fieldBlock.classList.add('field-block')

    const randomNum = Math.floor(Math.random() * 100) + 1
    if (randomNum <= 25) {
        dangerList.push(i)
        fieldBlock.innerHTML = `<i class="fas fa-bomb"></i>`
    }
    gameField.append(fieldBlock)
}

const crownNum = Math.floor(Math.random() * 200) + 1
const crownBlock = document.getElementById(`block-${crownNum}`)
const bombList = dangerList.filter(num => num !== crownNum)
crownBlock.innerHTML = `<i class="fas fa-crown"></i>`
crownBlock.classList.add('crown')

const startingBlock = document.getElementById(`block-1`)
startingBlock.innerHTML = `<i class="fas fa-search"></i>`
startingBlock.style.backgroundColor = 'red'

let prevBlock = 1
let currentBlock = 1
let xCoord = 1
let yCoord = 1
document.addEventListener('keyup', evt => {
    if (evt.key === 'w') {
        currentBlock = currentBlock - 20
        yCoord -= 1
    }
    if (evt.key === 's') {
        currentBlock = currentBlock + 20
        yCoord += 1
    }
    if (evt.key === 'a') {
        currentBlock = currentBlock - 1
        xCoord -= 1
    }
    if (evt.key === 'd') {
        currentBlock = currentBlock + 1
        xCoord += 1
    }

    if (yCoord == 0 || yCoord > height || xCoord == 0 || xCoord > width) {
        alert('Oh no! You fell out of the boundary. Game Over.')
        window.location.reload()
    } else if (bombList.find(num => num == currentBlock)) {
        alert('BOOM! The bomb exploded! Game Over!')
        window.location.reload()
    } else if (currentBlock == crownNum) {
        alert('Congratulations! You found the crown!')
        window.location.reload()
    } else {
        document.getElementById(`block-${currentBlock}`).style.backgroundColor = 'red'
        document.getElementById(`block-${currentBlock}`).innerHTML = `<i class="fas fa-search"></i>`
        document.getElementById(`block-${prevBlock}`).innerHTML = null
        prevBlock = currentBlock
    }
})