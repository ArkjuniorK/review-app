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

export { state, getters, mutations, actions }
