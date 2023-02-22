<template>
  <div class="ContainerChars">
    <div class="charsWrapper">
      <div v-if="characters.length > 0">
        <div v-if="!isFinding" class="buttons">
          <button class="prev" @click="prevPage">←</button>
          <div class="pageNumber">{{ currentPage }}</div>
          <button class="next" @click="nextPage">→</button>
        </div>
        <div v-else class="searchResults">Search results:</div>
        <ListChars
          :characters="isFinding ? findedChars : characters"
          :addToFavorites="addToFavorites"
          :removeFromFavorites="removeFromFavorites"
          :favoriteChars="favoriteChars"
        />
      </div>
      <div v-else>
        <p class="searchError">No characters found :(</p>
      </div>
    </div>
    <div class="favAndFindWrapper">
      <div class="favouriteTitle">Favorite Characters</div>
      <div class="favItems">
        <FavList
          :favoriteChars="favoriteChars"
          :removeFromFavorites="removeFromFavorites"
        />
      </div>
      <div class="findTitle">Find the character:</div>
      <div class="findWrapper">
        <FindChar @fch="fch" @finding="finding" />
      </div>
    </div>
  </div>
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

const fch = (data: Character[]) => {
  findedChars.value = data;
};
const finding = (data: boolean) => {
  isFinding.value = data;
};
const fetchData = async () => {
  const response = await axios.get<{
    info: { pages: number };
    results: Character[];
  }>(`https://rickandmortyapi.com/api/character/?page=${currentPage.value}`);
  characters.value = response.data.results;
  maxPage.value = response.data.info.pages;
};
fetchData();

const addToFavorites = (character: Character) => {
  const newCharacter = favoriteChars.value.find((c) => c.id === character.id);
  if (!newCharacter) {
    favoriteChars.value.push({
      id: character.id,
      name: character.name,
      image: character.image,
    });
    localStorage.setItem(
      "favoriteCharacters",
      JSON.stringify(favoriteChars.value)
    );
  }
};
const removeFromFavorites = (character: Character) => {
  const index = favoriteChars.value.findIndex((c) => c.id === character.id);
  if (index > -1) {
    favoriteChars.value.splice(index, 1);
    localStorage.setItem(
      "favoriteCharacters",
      JSON.stringify(favoriteChars.value)
    );
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
.ContainerChars {
  width: 100%;
  display: flex;
  align-items: flex-start;
}
@media (min-width: 1024px) {
  .ContainerChars {
    width: 1024px;
  }
}
.charsWrapper {
  width: 60%;
  padding-right: 0.5rem;
}
@media (min-width: 420px) {
  .charsWrapper {
    width: 75%;
    padding-right: 0.5rem;
  }
}
@media (min-width: 1024px) {
  .charsWrapper {
    /* width: 75%; */
    padding-right: 2rem;
  }
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pageNumber {
  width: 35%;
  text-align: center;
  margin: 0;
  color: black;
  font-weight: 500;
}
@media (min-width: 420px) {
  .pageNumber {
    width: 10%;
  }
}
button {
  border: none;
  background-color: #4caf50;
  color: white;
  padding: 0.1rem 1rem;
  border-radius: 0.2rem;
  cursor: pointer;
}
button.prev:active,
button.next:active {
  transform: translateY(0.02rem);
}
.searchResults {
  text-align: center;
  color: var(--vt-c-bgc-h1);
}
.searchError {
  text-align: center;
  color: #7d4545;
}
.favAndFindWrapper {
  width: 40%;
}
@media (min-width: 420px) {
  .favAndFindWrapper {
    width: 25%;
  }
}
.favouriteTitle {
  width: 100%;
  text-align: center;
  color: var(--vt-c-bgc-h1);
}
@media (min-width: 670px) {
  .favouriteTitle {
    font-size: 1.5rem;
  }
}
.favItems {
  /* background-color: #fff;
  border: 0.1rem solid #ccc;
  border-radius: 0.3rem; */
  width: 100%;
  height: 20rem;
}
.findTitle {
  text-align: center;
  margin-top: 1rem;
  color: var(--vt-c-bgc-h1);
}
.findWrapper {
  width: 100%;
}
</style>
