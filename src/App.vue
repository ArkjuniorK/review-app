<script>
import { computed, onMounted, ref } from 'vue'
import store from './store'

// components
import Form from './components/Form'
import Card from './components/Card'

export default {
  name: 'App',
  components: {
    Form,
    Card
  },
  setup() {
    const { getReviews, readreviews, response } = store()
    const responseTitle = computed(() => {
      return response.error !== ''
        ? 'Error'
        : response.success !== ''
        ? 'Sukses'
        : ''
    })
    const responseMessage = computed(() => {
      return response.error !== ''
        ? response.error
        : response.success !== ''
        ? response.success
        : ''
    })

    const loading = ref(false)

    // mounted
    onMounted(async () => {
      loading.value = true
      await getReviews()
      loading.value = false
    })

    return { readreviews, responseMessage, responseTitle, response, loading }
  }
}
</script>

<template>
  <div class="m-0 text-white flex">
    <aside class="sticky top-0 bg-red-50 h-screen w-96">
      <Form class="" />
    </aside>
    <main class="flex-1 relative w-full bg-red-200 bg-opacity-10 ">
      <div class=" w-3/5 mx-auto z-10">
        <div id="card-wrapper" class="my-6 space-y-6 w-full ">
          <Card
            v-for="review in readreviews"
            :id="review._id"
            :name="review.name"
            :date="review.updated_at"
            :rating="review.review_star"
            :comment="review.review_comment"
            :images="review.image"
            :key="review.id"
          />
        </div>
      </div>
      <div
        v-if="loading"
        class="absolute top-0 text-center text-red-200 z-50 flex justify-center items-center w-full h-full"
      >
        <span>
          <i class="im im-globe animate-bounce text-sm"></i>
          Memuat...
        </span>
      </div>
    </main>
    <div
      v-if="response.status"
      class="fixed space-y-2 bottom-0 w-64 right-0 bg-red-200 text-raleway p-4 rounded text-red-50 bg-opacity-70 m-4"
    >
      <span class="block w-full"> {{ responseTitle }} </span>
      <span class="w-full font-semibold text-xl text-light">
        {{ responseMessage }}
      </span>
    </div>
  </div>
</template>

<style></style>
