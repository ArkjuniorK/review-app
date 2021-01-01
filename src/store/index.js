import { reactive, computed, toRefs, ref } from 'vue'
import review from '../services'

// use reactive from vue to create vuex pattern
const state = () => {
  const review = reactive({
    review: []
  })

  const name = ref('Change Me')
  const stars = ref(2)
  return { ...toRefs(review), name, stars }
}

const formSetup = {
  // formContext: Symbol(),
  // formProviders: starValue => {
  //   const form = reactive({
  //     name: '',
  //     review_comment: '',
  //     review_star: starValue,
  //     images: []
  //   })
  //   function updateStar(star) {
  //     form.review_star = form.review_star === star ? star - 1 : star
  //     console.log(star)
  //     console.log(form.review_star)
  //   }
  //   provide(formContext, {
  //     form,
  //     updateStar
  //   })
  // },
  // formContexts: () => {
  //   const context = inject(formContext)
  //   return context
  // }
}

const mutations = {
  updateStars(star) {
    const { stars } = state()
    console.log(star)
    console.log(stars)

    stars.value = stars.value === star ? star - 1 : star
  }
}

const actions = {
  async getReview() {
    try {
      // get the review using index services
      const reviews = await review.index()
      console.log(reviews.data.data)
    } catch (err) {
      console.error(err)
    }
  },

  async postReview(payload) {
    try {
      // const rev = await review.post(payload)
      console.log(payload)
    } catch (err) {
      console.error(err)
    }
  }
}

const getters = {
  welcome: computed(() => {
    return state.status ? 'Hello World' : 'Hello Bitch'
  })
}

export { state, getters, mutations, actions, formSetup }
