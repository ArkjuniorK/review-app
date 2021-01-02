<script>
import { formContexts } from '../store/form'

export default {
  name: 'Rating',
  props: {
    grade: Number,
    max: Number,
    string: String,
    readonly: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: String,
      default: 'text-red-500'
    },
    size: {
      type: String,
      default: 'text-2xl'
    }
  },
  setup: () => {
    const { updateStar } = formContexts()

    return { updateStar }
  }
}
</script>

<template>
  <div id="list">
    <ul id="options" class="space-x-1 text-sm">
      <li
        v-for="star in max"
        :key="star.stars"
        @click="readonly ? null : updateStar(star, max)"
        class=" cursor-pointer inline-flex"
        :class="[color]"
      >
        <i :class="[star <= grade ? 'im im-star' : 'im im-star-o', size]"></i>
      </li>
    </ul>
  </div>
</template>
