const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const height = prompt('height? ')
const width = prompt('width? ')
const percentage = prompt('percentage? (0-100) ')

class Field {
    constructor(field) {
        this.field = field
        this.parsedHeight = parseInt(height)
        this.parsedWidth = parseInt(width)
        this.randomY = 0
        this.randomX = 0
    }

    checkValidInput() {
        if (percentage < 0 || percentage > 100 || typeof this.parsedHeight !== 'number' || typeof this.parsedWidth !== 'number') {
            console.log("Invalid height/width/percentage input, please try again")
        } else return true
    }

    generateRandomCoord(height, width) {
        const numY = Math.floor(Math.random() * height)
        const numX = Math.floor(Math.random() * width)
        this.randomY = numY
        this.randomX = numX
    }

    generateGameField() {
        const gameField = []

        for (let i=0; i<height; i++) {
            const fieldRow = []
            for (let j=0; j<width; j++) {
                let randomNum = Math.floor(Math.random() * 100)
                let isHole = randomNum >= 0 && randomNum <= percentage
                fieldRow.push( isHole? hole:fieldCharacter )
            }
            gameField.push(fieldRow)
        }
        this.field = gameField
    }

    generateStartLocation() {
        this.field[0][0] = pathCharacter
    }

    generateHatLocation() {
        this.generateRandomCoord(this.parsedHeight, this.parsedWidth)
        let validHatLocation = this.randomY !== 0 && this.randomX !== 0
        if (!validHatLocation) {
            this.generateRandomCoord(this.parsedHeight, this.parsedWidth)
        }
        this.field[this.randomY][this.randomX] = hat
    }

    printField() {
        for (const row of this.field) {
            console.log(row.join(''))
        }
    }

    printInstructions() {
        console.log("==============================")
        console.log("Instructions: Move up - W, Move down - S, Move left - A, Move right - D")
        console.log("Restart game - RE")
        console.log("==============================")
    }

    playGame() {
        this.generateGameField()
        this.generateHatLocation()
        this.generateStartLocation()
        this.printInstructions()
        this.printField()
        let yCoord = 0
        let xCoord = 0
        let isOutOfBound = false
        let isGameOver = this.field[yCoord][xCoord] === hat

        while (!isGameOver) {
            let nextMove = prompt('next move? ')
            switch (nextMove.toLowerCase()) {
                case 'w':
                    yCoord -= 1
                    break
                case 's':
                    yCoord += 1
                    break
                case 'a':
                    xCoord -= 1
                    break
                case 'd':
                    xCoord += 1
                    break
                case 're':
                    return console.log('Restart Game')
            }
            if (yCoord < 0 || yCoord > height || xCoord < 0 || xCoord > width) {
                console.log("Oh no, you fell out of the boundary. Game over.")
                isOutOfBound = true
                isGameOver = true
                break
            } else if (this.field[yCoord][xCoord] === hole) {
                console.log("OHHH NOOO! You fell into the hole! Game over!")
                isGameOver = true
                break
            } else if (this.field[yCoord][xCoord] === hat) {
                console.log("Congratulations! You found the hat!")
                isGameOver = true
                break
            } else if (!isOutOfBound) {
                this.field[yCoord][xCoord] = pathCharacter
            }
            console.clear()
            this.printInstructions()
            this.printField()
        }
    }
}

const hatGame = new Field
if (hatGame.checkValidInput()) hatGame.playGame()