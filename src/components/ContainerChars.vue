<template>
  <div class="ContainerChars">
    <div class="charsWrapper">
      <div v-if="characters.length > 0">
        <div class="buttons">
          <button class="prev" @click="prevPage" :disabled="isFinding">
            ←
          </button>
          <div class="pageNumber">{{ currentPage }}</div>
          <button class="next" @click="nextPage" :disabled="isFinding">
            →
          </button>
        </div>
        <ListChars
          :characters="isFinding ? findedChars : characters"
          :addToFavorites="addToFavorites"
          :removeFromFavorites="removeFromFavorites"
          :favoriteChars="favoriteChars"
        />
      </div>
      <div v-else>
        <p>No characters found.</p>
      </div>
    </div>
    <div class="favWrapper">
      <h2>Favorite Characters</h2>
      <div class="height300">
        <FavList
          :favoriteChars="favoriteChars"
          :removeFromFavorites="removeFromFavorites"
        />
      </div>
      <div class="FindCharWrapper">
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
// const length = 826;
// let count = 1;
// const step = 20;
// const getArr = (num: number): number[] => {
//   let arr: number[] = [];
//   if (num > length - step) num = 0;
//   for (let i = num; i < num + step; i++) {
//     arr.push(i);
//     count = i;
//   }
//   count++;
//   return arr;
// };
const fetchData = async () => {
  const response = await axios.get<{
    info: { pages: number };
    results: Character[];
  }>(
    // `https://rickandmortyapi.com/api/character/?page=${getArr(count).join(
    //   ","
    // )}`
    `https://rickandmortyapi.com/api/character/?page=${currentPage.value}`
  );
  characters.value = response.data.results;
  maxPage.value = response.data.info.pages;
};
fetchData();

const addToFavorites = (character: Character) => {
  const favoriteCharacter = favoriteChars.value.find(
    (c) => c.id === character.id
  );
  if (!favoriteCharacter) {
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
      JSON.stringify(favoriteChars.value.map((item) => item.name))
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

<style>
/* .app {
  padding-right: 17px;
}
.app {
  padding-right: 0px;
} */

.ContainerChars {
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: flex-start;
  /* justify-content: center; */
}

.charsWrapper {
  width: 75%;
  padding-right: 2rem;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pageNumber {
  width: 10%;
  text-align: center;
  margin: 0;
}
button {
  border: none;
  background-color: #4caf50;
  color: white;
  /* font-size: larger; */
  padding: 0.1rem 1rem;
  border-radius: 0.2rem;
  cursor: pointer;
}
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
button.prev:active,
button.next:active {
  transform: translateY(0.02rem);
}
.page-number {
  margin: 0 8px;
  font-size: 16px;
}

.favWrapper {
  width: 25%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: column;
}
.height300 {
  height: 300px;
}
h2 {
  text-align: center;
}
</style>
