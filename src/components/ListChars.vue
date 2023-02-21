<template>
  <div class="characters">
    <div
      v-for="char in props.characters"
      :key="char.id"
      :class="isFav(char) ? 'character fav' : 'character'"
      @click="
        isFav(char)
          ? props.removeFromFavorites(char)
          : props.addToFavorites(char)
      "
    >
      <div class="imageContainer">
        <img :src="char.image" :alt="char.name + ' image'" />
      </div>
      <div class="charName">{{ char.name }}</div>
      <div>
        <!-- <button @click="props.addToFavorites(char)">♥</button> -->
      </div>
      <div v-if="isFav(char)" class="heart">♥</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from "./ContainerChars.vue";
const props = defineProps({
  characters: {
    type: Array as () => Character[],
    required: true,
  },
  favoriteChars: {
    type: Array as () => Character[],
    required: true,
  },
  addToFavorites: {
    type: Function,
    required: true,
  },
  removeFromFavorites: {
    type: Function,
    required: true,
  },
});
const isFav = (char: Character) => {
  return props.favoriteChars.findIndex((item) => item.id === char.id) > -1;
};
</script>
<style scoped>
.characters {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-evenly; */
  /* width: 95%; */
  align-content: flex-start;
  /* align-items: flex-start; */
  /* height: 500px;
  overflow-y: scroll; */
  min-height: 100vh;
}
.character {
  width: 18%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--vt-c-text-dark-2);
  margin: 1%;
  text-align: center;
  border-radius: 4%;
  /* width: 6rem; */
}
.character:active {
  background-color: aqua;
}
.imageContainer {
  width: 100%;
  height: 100%;
}
.character img {
  width: 100%;
  height: 100%;
  border-radius: 5%;
}
.fav {
  background-color: rgb(222, 196, 132);
  box-shadow: 0.3rem 0.3rem 20px rgba(222, 196, 132, 0.5);
}
.charName {
  font-weight: bold;
  /* margin-top: 0.3rem; */
}
.heart {
  position: absolute;
  color: red;
}
</style>
