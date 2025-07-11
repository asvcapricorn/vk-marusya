<script setup lang="ts">
import { useModal } from '@/composables/useModal';
import { useModalStore } from '@/stores/modal'

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const modalStore = useModalStore();

const { isOpen, close } = useModal(props, emit);

const openAuth = () => {
    close();
    modalStore.openAuthModal();
};

</script>

<template>
    <div class="modal-overlay" v-if="isOpen" @click.self="close()">
        <div class="modal">
            <picture class="modal__logo">
                <img class="modal__image" src="@/assets/images/logo-light.png"
                    srcset="@/assets/images/logo-light@2x.png 2x" height="35" width="157" alt="Логотип">
            </picture>
            <span class="modal__title">Регистрация завершена</span>
            <span class="modal__text">Используйте вашу электронную почту для входа</span>
            <button class="btn btn--primary" type="button" @click="openAuth">Войти</button>
            <button class="modal__btn btn btn--icon" type="button" @click="close()">
                <svg class="modal__btn-icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="@/assets/images/sprite.svg#icon-close"></use>
                </svg>
            </button>
        </div>
    </div>
</template>
