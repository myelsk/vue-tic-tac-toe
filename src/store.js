import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
    state: () => {
        return {
            currentPlayer: 0,
            gameOver: false,
            gameWinner: 0,
            filledSquares: 0,
            player1: {
                choices: []
            },
            player2: {
                choices: [],
            },
            square1: {
                filled: false,
                playerFilled: 0,
            },
            square2: {
                filled: false,
                playerFilled: 0,
            },
            square3: {
                filled: false,
                playerFilled: 0,
            },
            square4: {
                filled: false,
                playerFilled: 0,
            },
            square5: {
                filled: false,
                playerFilled: 0,
            },
            square6: {
                filled: false,
                playerFilled: 0,
            },
            square7: {
                filled: false,
                playerFilled: 0,
            },
            square8: {
                filled: false,
                playerFilled: 0,
            },
            square9: {
                filled: false,
                playerFilled: 0,
            },
        }
    },
    actions: {
        incrementSquaresFilled() {
            this.filledSquares++
        },
    },
})