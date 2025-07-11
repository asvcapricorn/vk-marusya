<script setup lang="ts">
import { ref, watch } from 'vue';
import { useModal } from '@/composables/useModal';
import { useModalStore } from '@/stores/modal'
import { storeToRefs } from 'pinia'
import AppLoader from './AppLoader.vue';

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const { isOpen, close } = useModal(props, emit);

const modalStore = useModalStore();
const { trailerUrl } = storeToRefs(modalStore);
const currentSrc = ref('');
const iframeLoaded = ref(false);
const iframeError = ref(false);
const isLoading = ref(false);
let loadCheckTimeout: number | null = null;

watch(trailerUrl, (newValue) => {
    currentSrc.value = newValue;
    iframeLoaded.value = false;
    iframeError.value = false;
});

watch(isOpen, () => {
    isLoading.value = true;
    if (loadCheckTimeout) {
        clearTimeout(loadCheckTimeout);
        loadCheckTimeout = null;
    }
    if (isOpen.value) {
        loadCheckTimeout = setTimeout(() => {
            if (!iframeLoaded.value && !iframeError.value) {
                iframeError.value = true;
            }
        }, 5000);
    } else {
        iframeError.value = false;
    }
})

const handleIframeLoad = () => {
    iframeLoaded.value = true;
    isLoading.value = false;
    if (loadCheckTimeout) {
        clearTimeout(loadCheckTimeout);
    }
};

const handleIframeError = () => {
    iframeError.value = true;
    isLoading.value = false;
    if (loadCheckTimeout) {
        clearTimeout(loadCheckTimeout);
    }
};
</script>

<template>
    <div class="modal-overlay" v-if="isOpen" @click.self="close()">
        <div class="modal modal--trailer">
            <div class="modal__content">
                <AppLoader class="loader--trailer" v-if="isLoading && !iframeError" />
                <iframe class="modal__frame" title="Трейлер к фильму" frameborder="0" allowfullscreen :src="currentSrc"
                    @load="handleIframeLoad" @error="handleIframeError"
                    v-if="!isLoading && !iframeError && iframeLoaded"></iframe>
                <div class="modal__frame-error" v-if="iframeError">
                    <p class="modal__error-text">Кажется, YouTube сейчас недоступен, но вы можете</p>
                    <a class="btn modal__link" :href="currentSrc" target="_blank">попробовать открыть трейлер в новой
                        вкладке</a>
                </div>
            </div>
            <button class="modal__btn btn btn--icon" type="button" @click="close()">
                <svg class="modal__btn-icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="@/assets/images/sprite.svg#icon-close"></use>
                </svg>
            </button>
        </div>
    </div>
</template>
