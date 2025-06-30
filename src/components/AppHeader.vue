<script setup lang="ts">
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <RouterLink class="header__logo" to="/" exact>
          <picture class="header__picture">
            <img class="header__image" src="@/assets/images/logo.png" srcset="@/assets/images/logo@2x.png 2x"
              height="32" width="144" alt="Логотип">
          </picture>
        </RouterLink>
        <div class="header__main">
          <RouterLink class="header__link" to="/">Главная</RouterLink>
          <RouterLink class="header__link" to="/genres">Жанры</RouterLink>
          <div class="custom-input">
            <svg class="custom-input__search-icon" width="24" height="24" aria-hidden="true">
              <use xlink:href="@/assets/images/sprite.svg#icon-search"></use>
            </svg>
            <input class="custom-input__field" name="search" id="search" type="text" placeholder="Поиск">
          </div>
        </div>
        <RouterLink class="header__link" to="/auth">Войти</RouterLink>
      </div>
    </div>
  </header>
</template>
