<template>
  <div class="px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
      <TodoForm />
      <TodoItemsList />
    </div>
  </div>
</template>

<script>
import TodoItemsList from '@/components/TodoItemsList.vue'
import TodoForm from './components/TodoForm.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    TodoForm,
    TodoItemsList,
  },

  data() {
    return {
      todos: [],
    }
  },

  async created() {
    this.todos = await axios
      .get('http://localhost:8081/todos')
      .then((response) => response.data)
  },
}
</script>
