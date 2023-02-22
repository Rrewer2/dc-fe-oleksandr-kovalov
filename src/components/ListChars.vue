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
      <div class="charName">{{ cutName(char.name) }}</div>
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
const cutName = (str: string): string => {
  if (str.length > 16) return str.slice(0, 13) + "...";
  return str;
};
</script>
<style scoped>
.characters {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
@media (min-width: 1024px) {
  .characters {
    min-height: 100vh;
  }
}
.character {
  width: 42%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--vt-c-text-dark-2);
  margin: 4%;
  text-align: center;
  border-radius: 4%;
}
@media (min-width: 420px) {
  .character {
    width: 28%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--vt-c-text-dark-2);
    margin: 2%;
    text-align: center;
    border-radius: 4%;
  }
}
@media (min-width: 768px) {
  .character {
    width: 21%;
    margin: 2%;
  }
}
.character:active {
  background-color: #4caf50;
}
.imageContainer {
  width: 100%;
  height: 100%;
}
.character img {
  width: 100%;
  border-radius: 5%;
}
.fav {
  background-color: rgb(222, 196, 132);
  box-shadow: 0.3rem 0.3rem 20px rgba(222, 196, 132, 0.5);
}
.charName {
  font-size: 0.5rem;
  font-weight: bold;
  color: black;
}
@media (min-width: 768px) {
  .charName {
    font-size: 1rem;
  }
}
.heart {
  position: absolute;
  color: red;
}
</style>
