<template>
  <article v-if="characters.length" class="characters">
    <div
      v-for="{ id, name, image } in props.characters"
      :key="id"
      :class="isFav(id) ? 'favourite' : 'character'"
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
import type { Character } from "./ContainerChars.vue";
import useName from "@/composables/useName";
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
const isFav = (id: number) => {
  return props.favoriteChars.findIndex((item) => item.id === id) > -1;
};
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
.character,
.favourite {
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
  .character,
  .favourite {
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
.fav {
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
  text-align: center;
  color: var(--vt-c-text-error);
}
</style>
