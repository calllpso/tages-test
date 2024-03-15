<script setup>
import Svg from "@/components/Svg.vue";
import { computed } from "vue";
const props = defineProps({
  data: null,
  shoppingFunc: Function,
  favouritingFunc: Function,
});

const localData = computed(() => {
  return props.data;
});

function getImageUrl(name) {
  let path = `../assets${name}`;
  let image = new URL(path, import.meta.url);
  return image;
}
</script>

<template>
  <div class="card">
    <template v-for="item in localData">
      <figure class="card__figure">
        <span class="card__discount" v-if="item.price.old_price">
          <span class="card__discount-text"> Скидка </span>
        </span>
        <img
          class="card__img"
          :src="getImageUrl(item.image.url)"
          :alt="`${item.name}-${item.price.current_price}рублей`"
        />
        <figcaption>
          <span class="card__code">{{ item.code }}</span>
          <span class="card__name">{{ item.name }}</span>

          <span class="card__price">
            <span class="card__old-price" v-if="item.price.old_price"
              >{{ item.price.old_price }}₽</span
            >
            <span class="card__current-price"
              >{{ item.price.current_price }}₽</span
            >

            <span class="card__icons">
              <!-- cart svg -->
              <Svg
                v-if="props.shoppingFunc && !item.cart"
                class="card__icon"
                name="shopping-cart"
                @click="props.shoppingFunc(item.id)"
              ></Svg>
              <Svg
                v-else="props.shoppingFunc && item.cart"
                class="card__icon"
                name="circle-checked"
                @click="props.shoppingFunc(item.id)"
              ></Svg>
              <!-- heart svg -->
              <Svg
                v-if="props.favouritingFunc"
                class="card__icon"
                :class="item.favourite ? 'card__icon-heart_active' : ''"
                name="heart"
                @click="props.favouritingFunc(item.id)"
              ></Svg>
            </span>
          </span>
        </figcaption>
      </figure>
    </template>
  </div>
</template>

<style lang="sass" scoped>
$figure__border_cl: #eeeeee
$discount__background: #EB5757
$cl_gray: #888888

.card
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))
    gap: 3rem
    place-items: center

    container-type: inline-size

    .card__figure
      border: 1px solid $figure__border_cl

      max-width: 400px
      width: 100%

      @container (width < 560px)
        width: 80%
      @container (width < 400px)
        width: 90%

      .card__discount
        position: absolute
        display: inline-flex
        height: 1.5rem
        margin-top: .5rem //8px
        background: $discount__background
        color: white
        .card__discount-text
          font-size: .875rem
          padding: .25rem 1rem

      .card__img
        width: 100%
        box-sizing: border-box
        padding: .5rem 3rem 1.5rem 3rem


      figcaption
        display: flex
        flex-direction: column
        margin-left: .875rem
        .card__code
          display: inline
          height: 1rem
          vertical-align: middle
          color: $cl_gray
          font-size: .625rem  //10px
          margin-bottom: .375rem
        .card__name
          font-size: 1rem  //10px
          font-weight: 600
          margin-bottom: .25rem
        .card__price
          font-size: 1rem  //10px
          display: inline-flex
          align-items: center
          gap: .5rem
          height: 2.25rem
          margin-right: .875rem
          margin-bottom: .25rem
          .card__old-price
            text-decoration: line-through
            color: $cl_gray
          .card__icons
            height: 100%
            display: flex
            gap: .5rem
            align-items: center
            margin-left: auto
          .card__icon
            cursor: pointer
            &.card__icon-heart_active
              fill: red
</style>
