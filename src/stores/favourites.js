import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavouritesStore = defineStore("favourites", () => {
  const favourites = ref(
    new Set(JSON.parse(localStorage.getItem("favourites")) || [])
  );

  function setFavourite(id) {
    if (favourites.value.has(id)) {
      favourites.value.delete(id);
      localStorage.setItem(
        "favourites",
        JSON.stringify(Array.from(favourites.value))
      );
    } else {
      favourites.value.add(id);
      localStorage.setItem(
        "favourites",
        JSON.stringify(Array.from(favourites.value))
      );
    }
  }

  return { setFavourite, favourites };
});
