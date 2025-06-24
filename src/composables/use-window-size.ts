import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useWindowSize() {
  const width = ref(window.innerWidth)

  const update = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', update)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', update)
  })

  return { width }
}
