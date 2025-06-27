<script setup lang="ts">
import type { IMovie } from '../types/movie'

defineProps<{ movie: IMovie | null }>()

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ movie?.title }}</h1>
  </div>
</template>

<style scoped></style>
