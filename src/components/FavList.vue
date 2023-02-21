<template>
  <div v-if="props.favoriteChars.length > 0">
    <div :class="props.favoriteChars.length < 8 ? 'favList' : 'favList-long'">
      <div
        v-for="favChar in props.favoriteChars"
        :key="favChar.id"
        class="favItem"
      >
        <div><img :src="favChar.image" :alt="favChar.name" /></div>
        <div>
          <div class="favItemName">{{ favChar.name }}</div>
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
    <p>You have no yet favorite characters.</p>
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
</script>
<style scoped>
.favList {
  height: 300px;
}
.favList-long {
  height: 300px;
  overflow-y: scroll;
}
.favItem {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--vt-c-text-dark-2);
  /* margin: 0.5rem 0; */
  text-align: center;
  margin: 3px 0;
  font-size: 10px;
}
.favItem img {
  width: 2rem;
  height: 2rem;
}
.favItemName {
  font-weight: bold;
  margin-top: 0.5rem;
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
</style>
