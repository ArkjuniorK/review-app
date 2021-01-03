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
  <section
    class="bg-blue-300 bg-opacity-60 w-full 2xl:h-screen 2xl:flex items-center"
  >
    <div
      class="m-0 flex-grow 2xl:max-w-screen-xl 2xl:shadow-md 2xl:mx-auto 2xl:h-screen-4/5 text-white flex 2xl:rounded-2xl 2xl:overflow-hidden relative"
    >
      <aside class="sticky top-0 bg-blue-0  w-96 h-screen 2xl:h-screen-4/5">
        <Form class="" />
      </aside>
      <main
        class="flex-1 relative w-full 2xl:overflow-y-scroll bg-blue-200 bg-opacity-10 "
      >
        <div class=" w-3/5 mx-auto ">
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
          class="absolute top-0 text-center text-blue-0 z-50 flex justify-center items-center w-full h-full"
        >
          <span>
            <i class="im im-globe animate-bounce text-sm"></i>
            Memuat...
          </span>
        </div>
      </main>
      <div
        v-if="response.status"
        class="fixed 2xl:absolute space-y-2 bottom-0 w-64 right-0 bg-blue-300 text-raleway p-4 rounded text-blue-50  m-4"
      >
        <span class="block w-full"> {{ responseTitle }} </span>
        <span class="w-full font-semibold text-xl ">
          {{ responseMessage }}
        </span>
      </div>
    </div>
  </section>
</template>

<style></style>
