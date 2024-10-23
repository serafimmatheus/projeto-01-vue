<template>
  <div class="space-y-2">
    <TodoItems v-for="todo in $store.state.todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script>
import TodoItems from './TodoItems.vue'

export default {
  name: 'TodoSpinner',
  components: {
    TodoItems,
  },
}
</script>
