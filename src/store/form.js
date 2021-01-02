import { reactive, ref, provide, inject, readonly, toRaw } from 'vue'
import * as _ from 'lodash'
import review from '../services'

const formContext = Symbol('Only Form')
export const reviewContext = Symbol('Only Reviews')

/* TODO ----------------------------  

  Recreate the function into one exported providers

-------------------------------- END TODO*/

export const formProviders = () => {
  const form = reactive({
    name: '',
    review_comment: '',
    review_star: 0,
    images: []
  })

  function updateStar(star, max) {
    if (typeof star === 'number' && star <= max && star >= 0) {
      form.review_star = form.review_star === star ? star - 1 : star
    }
  }

  async function postForm() {
    try {
      const rawForm = toRaw(form),
        formData = new FormData()

      formData.append('name', rawForm.name)
      formData.append('review_comment', rawForm.review_comment)
      formData.append('review_star', rawForm.review_star)
      rawForm.images.forEach(image => formData.append('images', image))

      const rev = await review.post(formData)
      console.log(rev) // show the response
    } catch (err) {
      console.log(err) // show the error
    }
  }

  provide(formContext, {
    form,
    updateStar,
    postForm
  })

  return { form, updateStar, postForm }
}

export const reviewProviders = () => {
  const reviews = ref([])
  const readreviews = readonly(reviews) // immutable

  async function getReviews() {
    try {
      const req = await review.index()
      reviews.value = req.data.data
    } catch (err) {
      console.log(err)
    }
  }

  async function deleteReview(id) {
    try {
      console.log(id)
      const req = await review.remove(id)
      console.log(req.data.data)

      // use lodash the item from array temporary
      // until the component is mounted again
      _.remove(reviews.value, review => review._id === id)
    } catch (err) {
      console.log(err)
    }
  }

  provide(reviewContext, {
    readreviews,
    getReviews,
    deleteReview
  })

  return { readreviews, getReviews }
}

export const reviewContexts = () => inject(reviewContext)
export const formContexts = () => inject(formContext)
