<script>
import { toRefs, ref, inject } from 'vue'
import { formContext } from '../store'
import Rating from './Rating'

export default {
  name: 'Form',
  components: {
    Rating
  },
  setup() {
    const formTag = ref(null),
      upload = ref(null), // use ref to replave this.$refs
      alert = ref(false), // for images wrapper
      loading = ref(false)

    // use form and postReview from the formContexts
    const formContexts = () => inject(formContext)
    const { form, postForm } = formContexts()

    function selectFile(event) {
      const files = event.target.files // select the files
      // return empty array if files.length > 4
      form.images = files.length > 4 ? (alert.value = true) : Array.from(files)
    }

    async function postReview() {
      loading.value = true
      await postForm()
      loading.value = false
    }

    return {
      selectFile,
      upload,
      formTag,
      alert,
      postReview,
      loading,
      ...toRefs(form)
    }
  }
}
</script>

<template>
  <form
    @submit.prevent="postReview(id)"
    enctype="multipart/form-data"
    method="post"
    ref="formTag"
    name="form"
    class="flex flex-col justify-between relative h-full py-4"
  >
    <!-- top section -->
    <div
      id="top"
      class="text-center inline-block w-full space-y-4 absolute top-0 mt-4"
    >
      <h1 class="font-raleway text-center font-bold mb-4">
        Review
      </h1>
      <span class="flex-1 text-5xl font-bold font-lato text-red-200">
        {{ review_star }}
      </span>
      <Rating
        :grade="review_star"
        :max="5"
        class="rounded-md flex-1 my-auto"
        color="text-red-200"
      />
      <div class="mx-6 mb-6 space-y-3">
        <input
          v-model="name"
          type="text"
          class="border-red-200 bg-light border p-3 w-full placeholder-red-200 font-raleway font-semibold text-red-200"
          placeholder="Nama Kamu "
        />

        <textarea
          v-model="review_comment"
          role="textbox"
          contenteditable
          name="review"
          id="review"
          placeholder="Review Kamu"
          class="w-full bg-light border-red-200 border p-3 resize-y block overflow-hidden h-20 text-red-200 placeholder-red-200"
        ></textarea>
      </div>

      <div id="img-wrapper" class="mx-6">
        <!-- hide the actual input button and use ref to make it accassible -->
        <input
          class="hidden"
          type="file"
          accept="image/*"
          name="files"
          id="file"
          @change="selectFile"
          ref="upload"
          multiple
        />

        <!-- access the input via $refs -->
        <button
          class="w-full border-dashed border-2 py-5 border-red-100 text-red-100"
          type="button"
          @click="upload.click()"
        >
          UPLOAD IMAGES
        </button>

        <h3 v-if="alert" class="mt-4 font-raleway">
          Peringatan: Max 4 Gambar!
        </h3>

        <div v-if="images !== null" class="w-full space-y-1 mt-3 text-left ">
          <span v-for="img in images" :key="img.name" class="block">
            + {{ img.name || img.originalName }}
          </span>
        </div>
      </div>
    </div>

    <!-- bottom section -->
    <button
      type="submit"
      class="py-3 bg-red-200 absolute bottom-0 right-0 w-full  left-0 text-light font-bold font-raleway"
    >
      <i
        v-if="loading"
        class="im im-rocket animate-bounce origin-center text-sm"
      ></i>
      <span v-else>POST</span>
    </button>
  </form>
</template>

<style scoped>
span[contenteditable]:empty::before {
  content: 'Review Kamu';
  color: rgb(120, 53, 15);
  opacity: 0.6;
}
</style>
