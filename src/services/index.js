import axios from 'axios'

const Api = () => {
  return axios.create({
    baseURL: 'https://review-backend.herokuapp.com/api/v1'
  })
}

const review = {
  index: () => Api().get('review'), // get all reviews
  view: id => Api().get(`review/${id}`), // get one review
  post: payload => Api().post('review', payload), // post review
  patch: (id, payload) => Api().patch(`review/${id}`, payload), // update review
  remove: id => Api().delete(`review/${id}`) // delete review
}

export default review
