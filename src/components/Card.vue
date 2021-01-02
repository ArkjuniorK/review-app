<script>
import { inject, ref } from 'vue'
// import { inject } from 'vue'
import { reviewContext } from '../store'

import Rating from './Rating'

export default {
  name: 'Card',
  components: {
    Rating
  },
  props: {
    id: String,
    name: String,
    rating: Number,
    comment: String,
    images: Array
  },
  setup() {
    const menu = ref(false)
    const reviewContexts = () => inject(reviewContext)
    const { deleteReview } = reviewContexts()

    return { menu, deleteReview }
  }
}
</script>

<template>
  <div class="bg-red-50 w-full  flex p-4 rounded-md space-x-2">
    <div id="left" class="flex-inital">
      <div id="img-wrapper" class=" w-12 rounded-full overflow-hidden">
        <img
          src="https://via.placeholder.com/50.jpg"
          alt="dummy"
          class="w-full"
        />
      </div>
    </div>
    <div id="right" class="w-full">
      <div id="top" class="flex justify-between items-start">
        <div>
          <span class="font-raleway font-bold text-lg text-red-200">
            {{ name }}
          </span>
          <Rating
            :grade="rating"
            size="text-sm"
            :max="5"
            color="text-red-100"
          />
        </div>
        <div class="relative">
          <button
            type="button"
            @click="menu = !menu"
            class=" focus:outline-none"
          >
            <i class="im im-menu-dot-h text-red-200 text-sm"></i>
          </button>
          <div
            v-if="menu"
            class="bg-red-100 flex flex-col absolute right-0 p-2 rounded-b-md rounded-l-md text-left space-y-1 text-sm text-red-50"
          >
            <button>Edit</button>
            <button @click="deleteReview(id)">Delete</button>
          </div>
        </div>
      </div>
      <div id="bottom" class="mt-2">
        <p>{{ comment }}</p>
        <div v-if="images.length > 0" class="grid grid-cols-2  my-2">
          <div
            v-for="image in images"
            :key="image.name"
            class="w-full rounded-xl overflow-hidden h-36"
          >
            <img
              :src="['data:image/png;base64', image.b64]"
              :alt="image.name"
              class=" object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
