import { inject, provide, ref } from 'vue'

const STAR_CONTEXT = Symbol()

export function starProvider(initialValue) {
  const stars = ref(initialValue)
  const update = (star) => {
    stars.value = stars.value === star ? star - 1 : star
  }

  // provide it to direct and indirect child
  // it have the same consep with React context
  provide(STAR_CONTEXT, {
    stars,
    update,
  })
}

export function starContext() {
  // inject the data so it could be composable
  const context = inject(STAR_CONTEXT)

  if (!context) {
    throw new Error('Must based on starProvider')
  }

  return context
}
