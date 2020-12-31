<script>
import { onMounted, toRefs, reactive, ref, toRaw } from 'vue'
import { starContext } from '../store/star'
import { actions } from '../store/'
import Rating from './Rating'

export default {
  name: 'Form',
  components: {
    Rating
  },
  setup() {
    const { stars } = starContext()
    const formTag = ref(null)
    const upload = ref(null) // use ref to replave this.$refs

    // form data with reactive function because it take couples of properties
    const form = reactive({
      name: '',
      review_comment: '',
      review_star: stars.value,
      image: []
    })

    // create the form-data manually
    const rawForm = toRaw(form)
    const formData = new FormData()

    // object for required image with couples of properties
    // const image = reactive({
    //   originalName: '',
    //   size: null,
    //   b64: ''
    // })

    function selectFile(event) {
      // select the files
      const files = event.target.files
      if (files.length > 4) return null
      form.image = files

      // console.log(files)

      // add to image value
      // image.originalName = files[0].name
      // image.size = files[0].size

      /*  -------------------------------- 
        Because the server will turn the image to base64
        it actually not required to turn the image from the client
      -------------------------------- */

      // turn image to base64
      // const reader = new FileReader()
      // reader.addEventListener('load', () => {
      //   image.b64 = reader.result
      // })
      // reader.readAsDataURL(files[0])

      // add the image to image array
      // form.image.push(image)
    }

    function addReview() {
      formData.append('name', rawForm.name)
      formData.append('review_comment', rawForm.review_comment)
      formData.append('review_star', rawForm.review_star)
      formData.append('images', rawForm.image)

      actions.postReview(formData)
      // formData.values().forEach(value => console.log(value))
      // for (var value of formData.values()) {
      //   console.log(value)
      // }
    }

    onMounted(() => {})

    return {
      name,
      stars,
      selectFile,
      upload,
      addReview,
      formTag,
      ...toRefs(form)
    }
  }
}
</script>

<template>
  <form
    @submit.prevent="addReview"
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
        {{ stars }}
      </span>
      <Rating
        :grade="stars"
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

        <!-- use span to make the textbox become autoscroll -->
        <!-- span cannot use v-model -->
        <!-- <span
          role="textbox"
          contenteditable
          name="review"
          id="review"
          placeholder="Review Kamu"
          class="w-full bg-light border-red-200 border p-3 resize-y block overflow-hidden h-20 text-red-200"
        ></span> -->

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
          multiple
          name="files"
          id="file"
          @change="selectFile"
          ref="upload"
        />

        <!-- access the input via $refs -->
        <button
          class="w-full border-dashed border-2 py-5 border-red-100 text-red-100"
          type="button"
          @click="upload.click()"
        >
          UPLOAD IMAGES
        </button>

        <!-- iterate the image -->
        <div class="w-full space-y-1 mt-3 text-left">
          <span v-for="img in image" :key="img.name" class="block">
            <span> + {{ img.name }} </span>
          </span>
        </div>
      </div>
    </div>

    <!-- bottom section -->
    <button
      type="submit"
      class="py-3 bg-red-200 absolute bottom-0 right-0 w-full  left-0 text-light font-bold font-raleway"
    >
      POST
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
