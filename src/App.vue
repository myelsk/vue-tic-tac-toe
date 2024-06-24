<script setup>
  import Square from  './Square.vue';
  import { useStore } from './store';
  import {computed} from "vue";
  import {StopIcon, XMarkIcon} from "@heroicons/vue/24/solid";

  const store = useStore();

  const gameWinner = computed(() => {
    if (store.gameOver) {
      if (store.gameWinner === 1) {
        return XMarkIcon;
      }
      if (store.gameWinner === 2) {
        return StopIcon;
      }
    }
    return false;
  });
</script>
<template>
  <div class="app-wrapper">
    <div class="game-winner" v-if="store.gameOver">
      <button class="reset-button" @click="store.$reset()">{{ "Reset" }}</button>
      <template v-if="store.gameWinner === 0">
        {{ "This is tie" }}
      </template>
      <template v-else>
        {{ "Game winner is:" }}
        <div class="game-winner-icon">
          <component :is="gameWinner"></component>
        </div>
      </template>
    </div>
    <div class="row-1 square-row">
      <Square :id="1" />
      <Square :id="2" />
      <Square :id="3" />
    </div>
    <div class="row-2 square-row">
      <Square :id="4" />
      <Square :id="5" />
      <Square :id="6" />
    </div>
    <div class="row-3 square-row">
      <Square :id="7" />
      <Square :id="8" />
      <Square :id="9" />
    </div>
  </div>
</template>
<style>
  .square-row {
    width: 100px;
    height: 100px;
    float: left;
  }
  .app-wrapper {
    margin: 0 auto;
  }
  .square-row {
    cursor: pointer;
  }
  .game-winner-icon {
    width: 50px;
    height: 50px;
    display: inline-block;
    position: absolute;
  }
  .reset-button {
    background: #ccc;
    color: black;
    display: inline-block;
    width: 100px;
    height: 50px;
    margin-right: 50px;
  }
</style>