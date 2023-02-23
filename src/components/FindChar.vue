<template>
  <h3 class="search-title">Find the character:</h3>
  <form onsubmit="event.preventDefault()" class="search-form">
    <input
      class="search-input"
      type="text"
      v-model="query"
      placeholder="Enter name"
      :onblur="cleanError"
    />
    <button @click="cleanInput" class="search-input-clean">&times;</button>
  </form>
  <p v-if="loading" class="search-loading">Loading...</p>
  <p v-else-if="err" class="search-error">Nothing found</p>
</template>

<script setup lang="ts">
import { ref, watchEffect, defineEmits } from "vue";
import axios from "axios";
import type { ICharacter } from "@/interfaces/interfaces";

const findedChars = ref<ICharacter[]>([]);
const emits = defineEmits(["charsArray", "finding"]);
const query = ref("");
const loading = ref(false);
const err = ref(false);

const cleanError = () => {
  err.value = false;
};
const cleanInput = () => {
  query.value = "";
};
watchEffect(() => {
  if (query.value) {
    emits("finding", true);
    err.value = false;
    loading.value = true;
    axios
      .get(`https://rickandmortyapi.com/api/character/?name=${query.value}`)
      .then(({ data }) => {
        findedChars.value = data.results;
        loading.value = false;
        emits("charsArray", findedChars.value);
      })
      .catch(() => {
        findedChars.value = [];
        err.value = true;
        loading.value = false;
        emits("charsArray", findedChars.value);
      });
  } else {
    findedChars.value = [];
    emits("finding", false);
    err.value = false;
  }
});
</script>

<style scoped>
.search-title {
  text-align: center;
  margin-top: 1rem;
  color: var(--vt-c-bgc-title);
}
@media (min-width: 640px) {
  .search-title {
    font-size: 1.5rem;
  }
}
.search-form {
  position: relative;
}
.search-input {
  padding: 0.3rem;
  font-size: 1rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.3rem;
  width: 90%;
  outline: none;
}
.search-input::placeholder {
  color: #999;
  font-size: 0.75rem;
}
@media (min-width: 768px) {
  .search-input::placeholder {
    font-size: 1rem;
  }
}
.search-input:focus {
  border-color: var(--vt-c-bgc-btn);
}
.search-error {
  color: var(--vt-c-text-error);
}
.search-loading {
  color: var(--vt-c-text-char);
}
.search-input-clean {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--vt-c-text-remove);
  cursor: pointer;
  font-size: 2rem;
}

.search-input-clean:hover {
  color: var(--vt-c-text-remove-hover);
}
.search-input-clean:focus {
  outline: none;
}
</style>
