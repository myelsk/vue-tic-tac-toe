<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { StopIcon } from "@heroicons/vue/24/solid";
import { computed } from "vue";
import { useStore } from './store';

const store = useStore();

const winConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function checkWinCondition(userChoices, currentPlayer) {
  winConditions.forEach((condition) => {
    let checker = (condition) => condition.every(choice => userChoices.includes(choice));
    if (checker(condition)) {
      store.$patch({
        gameOver: true,
        gameWinner: currentPlayer
      });
    }
    if (store.filledSquares === 9) {
      store.$patch({
        gameOver: true,
        gameWinner: 0,
      });
    }
  })
}

const props = defineProps({
  id: { type: Number, default: 0 }
});

const playerChoice = computed(() => {
  let square = `square${props.id}`;
  if (store[`square${props.id}`].playerFilled === 1) {
    store.$patch({
      [square]: {
        playerFilled: 1,
      }
    });
    return XMarkIcon;
  }
  if (store[`square${props.id}`].playerFilled === 2) {
    store.$patch({
      [square]: {
        playerFilled: 2,
      }
    });
    return StopIcon;
  }
  return false;
});

function setActive() {
  let square = `square${props.id}`;
  if (store[square].playerFilled === 0 && !store.gameOver) {
    if (store.currentPlayer === 0) {
      store.$patch({
        currentPlayer: 1,
        [square]: {
          filled: true,
          playerFilled: 1,
        }
      });
      if (store.currentPlayer !== 0) {
        store.$patch((state) => {
          state[`player${store.currentPlayer}`].choices.push(props.id);
        });
      }
      store.incrementSquaresFilled();
      checkWinCondition(store[`player${store.currentPlayer}`].choices, store.currentPlayer);
      return;
    }
    if (store.currentPlayer === 1) {
      store.$patch({
        currentPlayer: 2,
        [square]: {
          filled: true,
          playerFilled: 2,
        }
      });
      if (store.currentPlayer !== 0) {
        store.$patch((state) => {
          state[`player${store.currentPlayer}`].choices.push(props.id);
        });
      }
      store.incrementSquaresFilled();
      checkWinCondition(store[`player${store.currentPlayer}`].choices, store.currentPlayer);
      return;
    }
    if (store.currentPlayer === 2) {
      store.$patch({
        currentPlayer: 1,
        [square]: {
          filled: true,
          playerFilled: 1,
        }
      });
      if (store.currentPlayer !== 0) {
        store.$patch((state) => {
          state[`player${store.currentPlayer}`].choices.push(props.id);
        });
      }
      store.incrementSquaresFilled();
      checkWinCondition(store[`player${store.currentPlayer}`].choices, store.currentPlayer);
    }
  }
}



</script>
<template>
  <div class="square-wrapper" @click="setActive">
    <component v-if='store[`square${props.id}`].filled' :is="playerChoice"></component>
  </div>
</template>
<style>
  .square-wrapper {
    width: 100px;
    height: 100px;
    border: 1px solid black;
  }
</style>