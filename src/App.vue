<script>
import { onMounted } from 'vue'
import { mutations, actions, state } from './store'
import { formProviders } from './store/form'

// components
import Form from './components/Form'

export default {
  name: 'App',
  components: {
    Form
  },
  setup() {
    formProviders(0) // init the star number
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
    <aside class="flex-initial sticky top-0 bg-red-50 h-screen w-96">
      <Form class="" />
    </aside>
    <main class="flex-1 bg-red-100 relative">
      Hello
    </main>
  </div>
</template>

<style></style>
