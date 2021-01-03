import { reactive, ref, provide, readonly, toRaw } from 'vue'
import remove from 'lodash/remove'
import reverse from 'lodash/reverse'
import review from '../services'

export const formContext = Symbol('Only Form')
export const reviewContext = Symbol('Only Reviews')

const store = () => {
  /* ---- state ---- */
  const form = reactive({
    id: '',
    name: '',
    review_comment: '',
    review_star: 0,
    images: [],
    onEdit: false
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
  async function postForm(id) {
    try {
      const rawForm = toRaw(form),
        formData = new FormData()
      // post the form
      formData.append('name', rawForm.name)
      formData.append('review_comment', rawForm.review_comment)
      formData.append('review_star', rawForm.review_star)
      rawForm.images.forEach(image => formData.append('images', image))

      // edited review will trigger the update function instead
      if (rawForm.onEdit) {
        await updateReview(id, formData)
      } else {
        await review.post(formData)
        updateResponse('success', 'Form berhasil ditambahkan')
      }
      await getReviews() // get the newest review
    } catch (err) {
      updateResponse('error', 'Form gagal ditambahkan')
    }
  }

  // get all reviews on mounted
  async function getReviews() {
    try {
      const req = await review.index()
      reviews.value = reverse(req.data.data) // reverse order
    } catch (err) {
      updateResponse('error', 'Gagal mendapatkan data')
    }
  }

  // get one review and display data on form
  // not sure if the image could be update
  async function getReview(id) {
    try {
      const req = await review.view(id)
      const data = req.data.data

      form.id = data._id
      form.name = data.name
      form.review_comment = data.review_comment
      form.review_star = data.review_star
      form.images = data.image
      form.onEdit = true

      updateResponse('success', 'Review berhasil didapatkan')
    } catch (err) {
      updateResponse('error', 'Review gagal didapatkan')
    }
  }

  // bug with the backend is when update the review
  // the image is dissappear
  async function updateReview(id, form) {
    try {
      await review.patch(id, form)
      updateResponse('success', 'Review berhasil diupdate')
    } catch (err) {
      updateResponse('error', 'Review gagal diupdate')
    }
  }

  // delete review based on 'id'
  // use lodash to temporaly remove the selected review
  // from the array
  async function deleteReview(id) {
    try {
      await review.remove(id)
      remove(reviews.value, review => review._id === id)
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
    reviews,
    readreviews,
    getReviews,
    getReview,
    updateReview,
    deleteReview
  })

  return { readreviews, getReviews, response }
}

export default store
