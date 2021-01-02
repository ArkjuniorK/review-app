import { reactive, ref, provide, readonly, toRaw } from 'vue'
import * as _ from 'lodash'
import review from '../services'

export const formContext = Symbol('Only Form')
export const reviewContext = Symbol('Only Reviews')

const store = () => {
  /* ---- state ---- */
  const form = reactive({
    name: '',
    review_comment: '',
    review_star: 0,
    images: []
  })
  const reviews = ref([])
  const readreviews = readonly(reviews) // immutable
  const response = reactive({
    status: false,
    success: '',
    error: ''
  })

  /* ------ actions ------ */
  function updateResponse(type, msg) {
    response.status = true
    response[type] = msg
    setTimeout(() => {
      response.status = false
      response[type] = ''
    }, 2000)
  }

  // update the star value
  function updateStar(star, max) {
    if (typeof star === 'number' && star <= max && star >= 0) {
      form.review_star = form.review_star === star ? star - 1 : star
    }
  }

  // post the form
  // turn the form into raw object
  // then append the object into the formData
  // so it could be submitted on server
  async function postForm() {
    try {
      const rawForm = toRaw(form),
        formData = new FormData()

      formData.append('name', rawForm.name)
      formData.append('review_comment', rawForm.review_comment)
      formData.append('review_star', rawForm.review_star)
      rawForm.images.forEach(image => formData.append('images', image))

      await review.post(formData)
      updateResponse('success', 'Form berhasil ditambahkan')
      await getReviews()
    } catch (err) {
      updateResponse('error', 'Form berhasil ditambahkan')
    }
  }

  // get all reviews on mounted
  async function getReviews() {
    try {
      const req = await review.index()
      reviews.value = req.data.data
      console.log(req.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  // delete review based on 'id'
  // use lodash to temporaly remove the selected review
  // from the array
  async function deleteReview(id) {
    try {
      await review.remove(id)
      _.remove(reviews.value, review => review._id === id)
      updateResponse('success', 'Review berhasil dihapus')
    } catch (err) {
      updateResponse('error', 'Review gagal dihapus')
    }
  }

  /* provide enable access through all components */
  provide(formContext, {
    form,
    updateStar,
    postForm
  })

  provide(reviewContext, {
    readreviews,
    getReviews,
    deleteReview
  })

  return { readreviews, getReviews, response }
}

export default store
