<template>
  <div class="space-y-2">
    <TodoItems />
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
