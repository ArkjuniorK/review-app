<script>
import { onMounted } from 'vue'
import { mutations, actions, state } from './store'
import { starProvider } from './store/star'

// components
import Form from './components/Form'

export default {
  name: 'App',
  components: {
    Form
  },
  setup() {
    starProvider(0) // provide the initial value to all child
    const { name } = state()

    function changeStatus() {
      mutations.setStatus()
      console.log(status)
    }

    // mounted
    onMounted(() => {
      actions.getReview()
    })

    return { changeStatus, name }
  }
}
</script>

<template>
  <div class="m-0 text-white flex">
    <nav class=" bg-red-50 w-96 h-screen">
      <Form />
    </nav>
  </div>
</template>

<style></style>
