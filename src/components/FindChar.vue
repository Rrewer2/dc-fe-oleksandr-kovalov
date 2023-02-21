<template>
  <div>Find the character:</div>
  <div class="inputWrap">
    <input
      type="text"
      v-model="query"
      placeholder="Enter name"
      :onblur="errorClean"
    /><button @click="cleanQuary" class="findCleen">&times;</button>
  </div>
  <div v-if="loading">Loading...</div>
  <div v-else-if="err" class="error">Nothing found</div>
</template>
<script setup lang="ts">
import { ref, watchEffect, defineEmits } from "vue";
import axios from "axios";
import type { Character } from "./ContainerChars.vue";

const findedChars = ref<Character[]>([]);
const emits = defineEmits(["fch", "finding"]);
const query = ref("");
const loading = ref(false);
const err = ref(true);

const errorClean = () => {
  err.value = false;
};
const cleanQuary = () => {
  query.value = "";
};
watchEffect(() => {
  if (query.value) {
    emits("finding", true);
    err.value = false;
    loading.value = true;
    axios
      .get(`https://rickandmortyapi.com/api/character/?name=${query.value}`)
      .then((response) => {
        findedChars.value = response.data.results;
        loading.value = false;
        emits("fch", findedChars.value);
      })
      .catch(() => {
        // console.log(error);
        err.value = true;
        loading.value = false;
      });
  } else {
    findedChars.value = [];
    emits("finding", false);
    err.value = false;
  }
});
</script>
<style scoped>
.inputWrap {
  display: flex;
}
input {
  font-size: 16px;
  /* padding: 0.5rem; */
  border: 0.1rem solid #ccc;
  border-radius: 0.3rem;
  width: 85%;
  outline: none;
}

input::placeholder {
  color: #999;
}

input:focus {
  border-color: #5cb85c;
}
.error {
  color: red;
}
.findCleen {
  width: 15%;
  background: none;
  border: none;
  color: #595959;
  cursor: pointer;
  font-size: 200%;
}

.findCleen:hover {
  color: #000000;
}
.findCleen:focus {
  outline: none;
}
</style>
