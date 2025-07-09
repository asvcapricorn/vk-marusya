import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

export function useModal(
  props: { modelValue: boolean },
  emit: (event: 'update:modelValue', value: boolean) => void,
) {
  const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  })

  const scrollbarWidth = ref(0)

  const close = () => {
    isOpen.value = false
  }

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }

  const toggleBodyScroll = (disable: boolean) => {
    const body = document.body
    if (disable) {
      scrollbarWidth.value = window.innerWidth - document.documentElement.clientWidth
      body.style.paddingRight = `${scrollbarWidth.value}px`
      body.classList.add('body-no-scroll')
    } else {
      body.classList.remove('body-no-scroll')
      body.style.paddingRight = ''
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
    toggleBodyScroll(false)
  })

  watch(isOpen, (val) => {
    toggleBodyScroll(val)
  })

  // watch(
  //   () => modalStore.anyModalOpen,
  //   (val) => {
  //     toggleBodyScroll(val)
  //   },
  //   { immediate: true },
  // )

  return {
    isOpen,
    close,
  }
}
