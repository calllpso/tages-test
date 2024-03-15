<script setup></script>

<template>
  <div class="app-grid">
    <header class="app-grid__header">
      <nav class="breadcrumbs">
        <ul class="breadcrumbs__list">
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link_inactive" href="">Главная</a>
          </li>
          <li class="breadcrumbs__separator">/</li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link_inactive" href="">Системы хранения</a>
          </li>
          <li class="breadcrumbs__separator">/</li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link_active" href=""
              >Комплекты стеллажных систем</a
            >
          </li>
        </ul>
      </nav>
    </header>
    <main class="app-grid__main">
      <div class="app-grid__container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/main'


.app-grid
    height: 100vh
    width: 100vw
    display: grid

    grid-template-areas: "a" "b"
    grid-template-columns: 1fr
    grid-template-rows: max-content auto

    .app-grid__header
        margin-top: .5rem
        grid-area: a
        z-index: 10
        .breadcrumbs__list
            min-width: 16rem
            display: flex
            flex-wrap: wrap
            gap: .5rem
            height: max-content
            .breadcrumbs__item
              width: max-content
              .breadcrumbs__link_inactive
                color: #ddd

    .app-grid__main
        grid-area: b
        height: 100%

        overflow: auto

        .app-grid__container
            width: 100%
            container-type: inline-size
            box-sizing: border-box
            padding: 1rem 0

    .app-grid__header, .app-grid__main
        padding: 0 1rem
</style>
