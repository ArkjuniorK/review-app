<script>
import { starContext } from '../store/star'

export default {
  name: 'Rating',
  props: {
    grade: Number,
    max: Number,
    string: String,
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
    color: {
      type: String,
      default: 'text-red-500',
    },
  },

  /* --------------------------------
     The problem with using this syntax was
     It actually mutate the props via assignment on data 
     --------------------------------- */
  // data() {
  //   return {
  //     stars: this.grade,
  //   }
  // },
  // methods: {
  //   rate(star) {
  //     if (typeof star === 'number' && star <= this.max && star >= 0) {
  //       this.stars = this.stars === star ? star - 1 : star
  //       console.log(this.stars)
  //     }
  //   },
  // },

  /* --------------------------------
      using setup() would be easy since 
      it could use provide method 
      so we only mutate provider data
      -------------------------------- */
  setup: (props) => {
    const { update } = starContext()

    function rates(star) {
      if (typeof star === 'number' && star <= props.max && star >= 0) {
        update(star)
      }
    }

    return { rates }
  },
}
</script>

<template>
  <div id="list">
    <ul id="options" class="space-x-1">
      <li
        v-for="star in max"
        :key="star.stars"
        @click="readonly ? null : rates(star)"
        class=" cursor-pointer inline-flex text-2xl"
        :class="color"
      >
        <i :class="star <= grade ? 'im im-star' : 'im im-star-o'"></i>
      </li>
    </ul>
  </div>
</template>
