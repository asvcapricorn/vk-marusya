<script setup lang="ts">
import { useModal } from '@/composables/useModal';

interface ErrorData {
  message: string
  code?: number
}

const props = defineProps<{
  modelValue: boolean;
  err?: ErrorData | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const { isOpen, close } = useModal(props, emit);

</script>

<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="close()" @keyup.esc="close()">
    <div class="modal">
      <picture class="modal__logo">
        <img class="modal__image" src="@/assets/images/logo-light.png" srcset="@/assets/images/logo-light@2x.png 2x"
          height="35" width="157" alt="Логотип">
      </picture>
      <span class="modal__title">Что-то пошло не так</span>
      <span class="modal__text">Ошибка: {{ err?.message }}</span>
      <span class="modal__text">Пожалуйста, повторите попытку</span>
      <button class="modal__btn btn btn--icon" type="button" @click="close()">
        <svg class="modal__btn-icon" width="24" height="24" aria-hidden="true">
          <use xlink:href="@/assets/images/sprite.svg#icon-close"></use>
        </svg>
      </button>
    </div>
  </div>
</template>
