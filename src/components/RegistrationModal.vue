<script setup lang="ts">
import { watch, onUnmounted, nextTick } from 'vue';
import { useModal } from '@/composables/useModal';
import { useAuthForm } from '@/composables/useAuthForm';

const props = defineProps<{
    modelValue: boolean;
}>();

console.log(props.modelValue);

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const { isOpen, close } = useModal(props, emit);
const { email, password, initValidator, destroyValidator } = useAuthForm(close);

watch(isOpen, async (val) => {
    if (val) {
        await nextTick();
        initValidator('#app .auth-form');
    }
});

onUnmounted(() => {
    destroyValidator();
});
</script>

<template>
    <Teleport to="#app">
        <div class="modal-overlay" v-if="isOpen" @click.self="close()">
            <div class="modal">
                <picture class="modal__logo">
                    <img class="modal__image" src="@/assets/images/logo-light.png"
                        srcset="@/assets/images/logo-light@2x.png 2x" height="35" width="157" alt="Логотип">
                </picture>
                <button class="modal__btn btn btn--icon" type="button" @click="close()">
                    <svg class="modal__btn-icon" width="24" height="24" aria-hidden="true">
                        <use xlink:href="@/assets/images/sprite.svg#icon-close"></use>
                    </svg>
                </button>
            </div>
        </div>
    </Teleport>
</template>
