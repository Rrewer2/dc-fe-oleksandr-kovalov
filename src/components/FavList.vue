<template>
  <div v-if="props.favoriteChars.length > 0" class="favContainer">
    <div :class="props.favoriteChars.length < 8 ? 'favList' : 'favList-long'">
      <div
        v-for="favChar in props.favoriteChars"
        :key="favChar.id"
        class="favItem"
      >
        <div><img :src="favChar.image" :alt="favChar.name" /></div>
        <div>
          <div class="favItemName">{{ cutName(favChar.name) }}</div>
        </div>
        <div>
          <button @click="props.removeFromFavorites(favChar)" class="remove">
            &times;
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="noFavChars">You have no favorite characters.</div>
  </div>
</template>
<script setup lang="ts">
import type { Character } from "./ContainerChars.vue";
const props = defineProps({
  favoriteChars: {
    type: Array as () => Character[],
    required: true,
  },
  removeFromFavorites: {
    type: Function,
    required: true,
  },
});
const cutName = (str: string): string => {
  if (str.length > 19) return str.slice(0, 16) + "...";
  return str;
};
</script>
<style scoped>
.favContainer {
  width: 100%;
}
.favList {
  height: 20rem;
  width: 90%;
}
.favList-long {
  height: 20rem;
  overflow-y: scroll;
}
.favItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 3px 0;
  font-size: 10px;
}
.favItem img {
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
}
.favItemName {
  font-weight: bold;
  color: #000000;
}
@media (min-width: 768px) {
  .favItemName {
    font-size: 1rem;
  }
}
.remove {
  background: none;
  border: none;
  color: #595959;
  cursor: pointer;
  font-size: 300%;
}

.remove:hover {
  color: #000000;
}
.remove:focus {
  outline: none;
}
.noFavChars {
  padding-top: 1rem;
  font-size: 0.75rem;
  color: #7d4545;
}
@media (min-width: 768px) {
  .noFavChars {
    font-size: 1rem;
  }
}
</style>
