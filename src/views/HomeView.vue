<script setup>
import _ from "lodash";
import { reactive, ref, watch } from "vue";
import Autocomplete from "@/components/Autocomplete.vue";
import Card from "@/components/Card.vue";
import jsonItems from "@/data/items.json";
import jsonMaterials from "@/data/materials.json";
import { useCartStore } from "@/stores/cart";
import { useFavouritesStore } from "@/stores/favourites";

const cartStore = useCartStore();
const favouritesStore = useFavouritesStore();

const materials = reactive(jsonMaterials);
materials.unshift({ id: null, name: "---" }); // filter off

const products = ref(jsonItems);
addFieldsToProducts();
const filterProducts = ref(JSON.parse(JSON.stringify(products.value)));
// first set favourites and inCart products
changingCart();
changingFavourite();

function addFieldsToProducts() {
  products.value.forEach((item) => {
    item.favourite = false;
    item.cart = false;
  });
}

const priceSortes = [
  { name: "---", value: null },
  { name: "Цена по возрастанию", value: "asc" },
  { name: "Цена по убыванию", value: "desc" },
];

// set default sort and filter
const materialFilter = ref(materials[0].name);
const priceSort = ref(priceSortes[0].name);

watch(
  () => materialFilter.value,
  () => {
    sortByMaterial();
    sortByPrice();
  }
);
watch(
  () => priceSort.value,
  () => {
    sortByMaterial();
    sortByPrice();
  }
);

function sortByMaterial() {
  filterProducts.value = JSON.parse(JSON.stringify(products.value));
  changingCart();
  changingFavourite();

  let material = _.filter(materials, (item) => {
    return item.name == materialFilter.value;
  })[0];

  if (material.id == null) {
    return;
  }
  filterProducts.value = _.filter(filterProducts.value, (item) => {
    return item.material == material.id;
  });
}

function sortByPrice() {
  let priceMode = _.filter(priceSortes, (item) => {
    return item.name == priceSort.value;
  })[0];

  if (priceMode.value == null) {
    return;
  }
  filterProducts.value = _.orderBy(
    filterProducts.value,
    ["price.current_price"],
    [priceMode.value]
  );
}

function setProduct(id) {
  cartStore.setProduct(id);
  changingCart();
}

function changingCart() {
  filterProducts.value = _.map(filterProducts.value, (product) => ({
    ...product,
    cart: cartStore.cart.has(product.id),
  }));
}

function setFavourite(id) {
  favouritesStore.setFavourite(id);
  changingFavourite();
}

function changingFavourite() {
  filterProducts.value = _.map(filterProducts.value, (product) => ({
    ...product,
    favourite: favouritesStore.favourites.has(product.id),
  }));
}
</script>

<template>
  <header class="page-name">Комплекты стеллажных систем</header>

  <main>
    <div class="sorting-area">
      <Autocomplete
        name="сортировать по"
        :currentValue="priceSort"
        :data="priceSortes"
        input_value="name"
        value="value"
        @callback="(val) => (priceSort = val)"
      ></Autocomplete>

      <Autocomplete
        name="материал"
        :currentValue="materialFilter"
        :data="materials"
        input_value="name"
        value="value"
        @callback="(val) => (materialFilter = val)"
      ></Autocomplete>
    </div>

    <Card
      :data="filterProducts"
      :shoppingFunc="(id) => setProduct(id)"
      :favouritingFunc="(id) => setFavourite(id)"
    ></Card>
  </main>
</template>

<style lang="sass" scoped>
.page-name
  font-size: 2rem
  padding-bottom: 1rem

.sorting-area
  display: flex
  gap: 2rem
  position: sticky
  top: 0rem
  min-width: min-content
  padding: 1rem 0
  background: white
  z-index: 10

  @container (width < 560px)
    padding-left: 10%
  @container (width < 400px)
    padding-left: 5%
</style>
