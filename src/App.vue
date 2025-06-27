<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <RouterLink class="header__logo" to="/">Иконка Маруся</RouterLink>
        <div class="header__main">
          <RouterLink class="header__link" to="/">Главная</RouterLink>
          <RouterLink class="header__link" to="/genres">Жанры</RouterLink>
          <div class="custom-input">
            <input class="custom-input__field" name="search" id="search" type="text" placeholder="Поиск">
            <label for="search"></label>
          </div>
        </div>
        <RouterLink to="/auth">Войти</RouterLink>
      </div>
    </div>
  </header>
  <RouterView />
</template>
