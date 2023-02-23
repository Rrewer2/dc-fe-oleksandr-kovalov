<template>
  <main class="main">
    <section class="chars-wrapper">
      <h3 v-if="isFinding" class="search-results">Search results:</h3>
      <nav v-else class="nav-buttons">
        <button class="nav-btn" @click="prevPage">←</button>
        <h3 class="page-number">{{ currentPage }}</h3>
        <button class="nav-btn" @click="nextPage">→</button>
      </nav>
      <ListChars
        :characters="isFinding ? findedChars : characters"
        :addToFavorites="addToFavorites"
        :removeFromFavorites="removeFromFavorites"
        :favoriteChars="favoriteChars"
      />
    </section>
    <section class="fav-find-wraper">
      <FavList
        :favoriteChars="favoriteChars"
        :removeFromFavorites="removeFromFavorites"
      />
      <FindChar @charsArray="charsArray" @finding="finding" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import ListChars from "./ListChars.vue";
import FavList from "./FavList.vue";
import FindChar from "./FindChar.vue";

export interface Character {
  id: number;
  name: string;
  image: string;
}

const characters = ref<Character[]>([]);
const favoriteChars = ref<Character[]>([]);
const findedChars = ref<Character[]>([]);
const currentPage = ref(1);
const maxPage = ref(42);
const isFinding = ref(false);

const storedChars = localStorage.getItem("favoriteCharacters");
if (storedChars) {
  try {
    favoriteChars.value = JSON.parse(storedChars) as Character[];
  } catch (error) {
    console.error("Error parsing localStorage value:", error);
  }
}

const charsArray = (arr: Character[]) => {
  findedChars.value = arr;
};
const finding = (data: boolean) => {
  isFinding.value = data;
};
const fetchData = async () => {
  const { data } = await axios.get<{
    info: { pages: number };
    results: Character[];
  }>(`https://rickandmortyapi.com/api/character/?page=${currentPage.value}`);
  characters.value = data.results;
  maxPage.value = data.info.pages;
};
fetchData();
const localSet = (data: Character[]) => {
  localStorage.setItem("favoriteCharacters", JSON.stringify(data));
};
const addToFavorites = ({ id, name, image }: Character) => {
  const index = favoriteChars.value.findIndex((item) => item.id === id);
  if (index === -1) {
    favoriteChars.value.push({ id, name, image });
    localSet(favoriteChars.value);
  }
};
const removeFromFavorites = (id: number) => {
  const index = favoriteChars.value.findIndex((item) => item.id === id);
  if (index > -1) {
    favoriteChars.value.splice(index, 1);
    localSet(favoriteChars.value);
  }
};
const nextPage = () => {
  currentPage.value =
    currentPage.value === maxPage.value ? 1 : currentPage.value + 1;
  fetchData();
};
const prevPage = () => {
  currentPage.value =
    currentPage.value === 1 ? maxPage.value : currentPage.value - 1;
  fetchData();
};
</script>

<style scoped>
.main {
  margin: 0.5rem auto;
  display: flex;
  /* column-gap: 0.5rem; */
}
@media (min-width: 1024px) {
  .main {
    margin: 1rem 5rem;
  }
}
.chars-wrapper {
  width: 60%;
  padding-right: 0.5rem;
}
@media (min-width: 640px) {
  .chars-wrapper {
    width: 75%;
    padding-right: 0.5rem;
  }
}
@media (min-width: 1024px) {
  .chars-wrapper {
    padding-right: 2rem;
  }
}
.fav-find-wraper {
  width: 40%;
}
@media (min-width: 640px) {
  .fav-find-wraper {
    width: 25%;
  }
}
.nav-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
.page-number {
  width: 35%;
  text-align: center;
  margin: 0;
  color: var(--vt-c-text-char);
  font-weight: 500;
}
@media (min-width: 640px) {
  .page-number {
    width: 10%;
  }
}
.nav-btn {
  border: none;
  background-color: var(--vt-c-bgc-btn);
  color: var(--vt-c-text-btn);
  padding: 0.1rem 1rem;
  border-radius: 0.2rem;
  cursor: pointer;
}
.nav-btn:active {
  transform: translateY(0.02rem);
}
.search-results {
  text-align: center;
  color: var(--vt-c-bgc-title);
}
</style>
