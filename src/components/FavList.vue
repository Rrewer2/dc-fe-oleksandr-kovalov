<template>
  <article
    class="fav-list"
    :class="{
      'fav-list-long': props.favoriteChars.length >= maxFavLength,
    }"
  >
    <h3 class="fav-title">Favorite ICharacters</h3>
    <div v-if="props.favoriteChars.length">
      <div
        v-for="{ id, name, image } in props.favoriteChars"
        :key="id"
        class="fav-item"
      >
        <img :src="image" :alt="name" />
        <p class="fav-item-name">
          {{ cutName({ str: name, maxNameLength: 19 }) }}
        </p>

        <button @click="props.removeFromFavorites(id)" class="fav-remove">
          &times;
        </button>
      </div>
    </div>
    <h3 v-else class="no-fav-chars">
      You have no favorite characters. Select someone to add to the list
    </h3>
  </article>
</template>

<script setup lang="ts">
import type { ICharacter } from "@/interfaces/interfaces";
import useName from "@/composables/useName";
const props = defineProps({
  favoriteChars: {
    type: Array as () => ICharacter[],
    required: true,
  },
  removeFromFavorites: {
    type: Function,
    required: true,
  },
});
const { cutName } = useName();
const maxFavLength = 5;
</script>

<style scoped>
.fav-title {
  text-align: center;
  color: var(--vt-c-bgc-title);
}
@media (min-width: 640px) {
  .fav-title {
    font-size: 1.5rem;
  }
}
.fav-list {
  height: 20rem;
  transition: 3s linear;
}
.fav-list-long {
  overflow-y: scroll;
}
@keyframes ani {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fav-item {
  opacity: 0;
  animation: ani 1.5s forwards;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 0.1rem 0;
  /* font-size: 1rem; */
}
.fav-item img {
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
}
.fav-item-name {
  font-weight: bold;
  font-size: 0.75rem;
  color: var(--vt-c-text-char);
}
@media (min-width: 640px) {
  .fav-item-name {
    font-size: 1rem;
  }
}
.fav-remove {
  background: none;
  border: none;
  color: var(--vt-c-text-remove);
  cursor: pointer;
  font-size: 2rem;
}

.fav-remove:hover {
  color: var(--vt-c-text-remove-hover);
}
.fav-remove:focus {
  outline: none;
}
.no-fav-chars {
  opacity: 0;
  animation: ani 1.5s forwards;
  padding-top: 1rem;
  font-size: 0.75rem;
  color: var(--vt-c-text-error);
}
@media (min-width: 768px) {
  .no-fav-chars {
    font-size: 1rem;
  }
}
</style>
