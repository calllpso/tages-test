import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cart = ref(new Set(JSON.parse(localStorage.getItem("products")) || []));

  function setProduct(id) {
    if (cart.value.has(id)) {
      cart.value.delete(id);
      localStorage.setItem("products", JSON.stringify(Array.from(cart.value)));
    } else {
      cart.value.add(id);
      localStorage.setItem("products", JSON.stringify(Array.from(cart.value)));
    }
  }

  return { setProduct, cart };
});
