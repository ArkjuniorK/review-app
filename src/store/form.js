import { reactive, provide, inject, toRaw } from 'vue'
import review from '../services'

const formContext = Symbol()

export const formProviders = starValue => {
  const form = reactive({
    name: '',
    review_comment: '',
    review_star: starValue,
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
}

export const formContexts = () => {
  const context = inject(formContext)
  return context
}
