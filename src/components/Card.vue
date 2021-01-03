<script>
import { inject, ref } from 'vue'
import { reviewContext } from '../store'
import dayjs from 'dayjs'

import Rating from './Rating'

export default {
  name: 'Card',
  components: {
    Rating
  },
  props: {
    id: String,
    name: String,
    date: String,
    rating: Number,
    comment: String,
    images: Array
  },
  setup(props) {
    const menu = ref(false),
      loading = ref(false)

    const reviewContexts = () => inject(reviewContext)
    const { deleteReview, getReview } = reviewContexts()

    const dates = new Date(props.date),
      newDate = dayjs(dates)
        .locale('id')
        .format('dddd, D MMMM YYYY')

    async function dlteReview(id) {
      menu.value = false
      loading.value = true
      await deleteReview(id)
      loading.value = false
    }

    async function gtReview(id) {
      menu.value = false
      loading.value = true
      await getReview(id)
      loading.value = false
    }

    return { menu, dlteReview, gtReview, newDate, loading }
  }
}
</script>

<template>
  <div class="bg-blue-0 w-full p-4 rounded-md relative">
    <div
      v-if="loading"
      class="absolute top-0 flex justify-center items-center w-full h-full bg-blue-200 left-0 rounded-md space-x-1 bg-opacity-90 text-light"
    >
      <i class="im im-globe animate-bounce text-sm"></i>
      <span>Memuat...</span>
    </div>
    <div class="flex space-x-2">
      <div id="left" class="flex-inital">
        <div id="img-wrapper" class=" w-12 rounded-full overflow-hidden">
          <img
            src="https://via.placeholder.com/50.jpg"
            alt="dummy"
            class="w-full h-full"
          />
        </div>
      </div>
      <div id="right" class="w-full">
        <div id="top" class="flex justify-between items-start">
          <div>
            <span class="font-raleway font-bold text-lg text-blue-300 ">
              {{ name }}
            </span>
            <span
              class="font-lato block text-blue-200 text-sm leading-none mb-3"
            >
              {{ newDate }}
            </span>
            <Rating
              :grade="rating"
              size="text-base"
              :max="5"
              color="text-blue-200"
            />
          </div>
          <div class="relative">
            <button
              type="button"
              @click="menu = !menu"
              class=" focus:outline-none"
            >
              <i class="im im-menu-dot-h text-blue-100 text-sm"></i>
            </button>
            <div
              v-if="menu"
              class="bg-blue-200 flex flex-col absolute right-0 p-2 rounded-b-md rounded-l-md text-left space-y-1 text-sm text-red-50"
            >
              <button @click="gtReview(id)" class="focus:outline-none">
                Edit
              </button>
              <button @click="dlteReview(id)" class="focus:outline-none">
                Delete
              </button>
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
  </div>
</template>
