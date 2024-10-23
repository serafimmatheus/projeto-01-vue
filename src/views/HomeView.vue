<template>
  <div class="max-w-7xl w-full mx-auto px-5">
    <div class="mt-16">
      <TodoSpinner v-if="loading" />

      <template v-else>
        <TodoForm />
        <TodoItemsList v-if="$store.state.todos.length" />
        <TodoEmpty v-else />
      </template>
    </div>
  </div>
</template>

<script>
import TodoEmpty from '@/components/TodoEmpty.vue'
import TodoForm from '@/components/TodoForm.vue'
import TodoItemsList from '@/components/TodoItemsList.vue'
import TodoSpinner from '@/components/TodoSpinner.vue'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AboutView',
  components: {
    TodoForm,
    TodoItemsList,
    TodoSpinner,
    TodoEmpty,
  },

  setup() {
    const loading = ref(false)
    const store = useStore()

    onMounted(() => {
      loading.value = true
      store.dispatch('fetchTodos').finally(() => {
        loading.value = false
      })
    })

    return {
      loading,
    }
  },
}
</script>
