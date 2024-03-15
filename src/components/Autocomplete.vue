<script setup>
import { ref, nextTick, computed } from "vue";

import Svg from "@/components/Svg.vue";

const props = defineProps({
  name: null,
  data: null,
  currentValue: null,
  input_value: null,
  value: null,
});

const isVisible = ref(false);

const emits = defineEmits(["callback"]);
const currentValue = computed({
  get() {
    return props.currentValue;
  },
  set(value) {
    emits("callback", value);
  },
});

async function selectItem(item) {
  currentValue.value = item[props.input_value];
}

const dropmenuBtn = ref(null);
const overlay = ref(null);

function openAutocomplete() {
  if (!isVisible.value) {
    isVisible.value = true;
    nextTick(() => {
      bindContentToParent();
      clickListener();
    });
  }
}

function clickListener() {
  document.addEventListener("click", function clickMouse(event) {
    if (!dropmenuBtn.value.contains(event.target)) {
      this.removeEventListener("click", clickMouse);
      isVisible.value = false;
    }
  });
}

function bindContentToParent() {
  let coords = dropmenuBtn.value.getBoundingClientRect();
  overlay.value.style.top = coords.bottom + "px";
  overlay.value.style.left = coords.left + "px";

  overlay.value.style.width =
    Math.max(
      coords.width,
      overlay.value.children[0].getBoundingClientRect().width
    ) + "px";
}
</script>

<template>
  <div>
    <label for="dropmenu" class="dropmenu-label">{{ props.name }}</label>

    <button ref="dropmenuBtn" class="dropmenu-btn" @click="openAutocomplete">
      <span class="dropmenu-btn__value">{{ currentValue }}</span>
      <Svg
        class="dropmenu-btn__icon"
        name="chevron-down"
        :opened="isVisible"
      ></Svg>
    </button>
  </div>

  <!-- overlay -->
  <Teleport to="body" v-if="isVisible">
    <div ref="overlay" class="overlay">
      <ul class="overlay__list">
        <template v-for="item in props.data">
          <li class="overlay__list-item" @click="selectItem(item)">
            {{ item[props.input_value] }}
          </li>
        </template>
      </ul>
    </div>
  </Teleport>
</template>

<style lang="sass" scoped>

.dropmenu-label
  display: inline-block
  padding-left: .5rem
  padding-bottom: .5rem

.dropmenu-btn
  all: unset
  width: 100%
  height: 2rem
  background: #f1f1f1
  padding-left: .5rem
  display: flex
  align-items: center
  cursor: pointer

  .dropmenu-btn__value
    height: max-content
    min-width: min-content
  .dropmenu-btn__icon
      width: 1.75rem
      min-width: 1.75rem
      margin-left: auto
      transition: transform .2s
      transform: rotate(0deg)
      &[opened=true]
          transform: rotate(-180deg)

.overlay
  z-index: 1000
  position: absolute
  contain: layout
  background: #ddd
  .overlay__list
    cursor: pointer
    border: 1px solid
    .overlay__list-item
      padding-left: 0.5rem
      &:hover
        background: #a5c5dc
</style>
