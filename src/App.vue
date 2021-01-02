<script>
import { onMounted } from 'vue'
import { formProviders, reviewProviders } from './store/form'

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
    formProviders() // init the star number and provide the data to all child
    const { readreviews, getReviews } = reviewProviders()

    console.log(readreviews)

    // console.log('App Reviews', readreviews)
    // console.log('App Form', form)

    // mounted
    onMounted(() => {
      getReviews()
    })

    return { name, readreviews }
  }
}
</script>

<template>
  <div class="m-0 text-white flex">
    <aside class="sticky top-0 bg-red-50 h-screen w-96">
      <Form class="" />
    </aside>
    <main class="flex-1 relative w-full bg-red-200 bg-opacity-10 ">
      <div class=" w-3/5 mx-auto">
        <div id="card-wrapper" class="my-6 space-y-6 w-full ">
          <Card
            v-for="review in readreviews"
            :id="review._id"
            :name="review.name"
            :rating="review.review_star"
            :comment="review.review_comment"
            :images="review.image"
            :key="review.id"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style></style>
