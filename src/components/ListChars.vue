<template>
  <article v-if="characters.length" class="characters">
    <div
      v-for="{ id, name, image } in props.characters"
      :key="id"
      :class="{ favourite: isFav(id), character: true }"
      @click="
        isFav(id)
          ? props.removeFromFavorites(id)
          : props.addToFavorites({ id, name, image })
      "
    >
      <img class="image-container" :src="image" :alt="`${name} image`" />
      <p class="char-name">{{ cutName({ str: name, maxNameLength: 16 }) }}</p>
      <i v-if="isFav(id)" class="heart">♥</i>
    </div>
  </article>
  <h2 v-else class="search-error">No characters found :(</h2>
</template>

<script setup lang="ts">
import type { ICharacter } from "@/interfaces/interfaces";
import useName from "@/composables/useName";
import useFindIndex from "@/composables/useFindIndex";

const props = defineProps({
  characters: {
    type: Array as () => ICharacter[],
    required: true,
  },
  favoriteChars: {
    type: Array as () => ICharacter[],
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
const { getIndex } = useFindIndex();
const isFav = (id: number): boolean =>
  getIndex({ id, array: props.favoriteChars }) > -1;
const { cutName } = useName();
</script>

<style scoped>
.characters {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  min-height: 90vh;
}
@media (min-width: 1024px) {
  .characters {
    min-height: 100vh;
  }
}
@keyframes ani {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.character {
  opacity: 0;
  animation: ani 1.5s forwards;
  width: 28%;
  margin: 2%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--vt-c-bgc-char);
  border-radius: 4%;
}
@media (min-width: 768px) {
  .character {
    width: 21%;
    margin: 2%;
  }
}
.character:active {
  background-color: var(--vt-c-bgc-char-active);
}
.image-container {
  width: 100%;
  height: 100%;
}
.character img {
  width: 100%;
  border-radius: 5%;
}
.favourite {
  background-color: var(--vt-c-bgc-char-favourite);
  box-shadow: 0.3rem 0.3rem 20px var(--vt-c-bgc-char-favourite-shadow);
}
.char-name {
  font-size: 0.5rem;
  font-weight: bold;
  color: var(--vt-c-text-char);
}
@media (min-width: 768px) {
  .char-name {
    font-size: 1rem;
  }
}
.heart {
  position: absolute;
  color: var(--vt-c-text-heart);
}
.search-error {
  opacity: 0;
  animation: ani 1.5s forwards;
  min-height: 90vh;
  text-align: center;
  color: var(--vt-c-text-error);
}
</style>
