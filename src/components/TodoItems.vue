<template>
  <div class="bg-gray-300 rounded-sm">
    <div
      class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0"
    >
      <div class="flex items-center justify-center mr-2">
        <button
          @click="toggleCompletedTodo"
          :class="{
            'text-green-500': isComplete,
            'text-gray-400': !isComplete,
          }"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </button>
      </div>

      <div class="w-full">
        <input
          type="text"
          placeholder="Digite a sua tarefa"
          :value="todo.title"
          @keyup.enter="updatedTodo"
          class="bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3"
        />
      </div>

      <div class="ml-auto flex items-center justify-center">
        <button @click="removeTodo" class="focus:outline-none">
          <svg
            class="ml-3 h-4 w-4 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 7L18.1327 19.1425C18.0579 
20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 
19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 
3 9 3.44772 9 4V7M4 7H20"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'TodoForm',
  props: {
    todo: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  setup(props) {
    const store = useStore()
    const isComplete = ref(false)

    onMounted(() => {
      isComplete.value = props.todo.completed
    })

    const removeTodo = () => {
      store.dispatch('removeTodo', props.todo.id)
    }

    const updatedTodo = ($event) => {
      console.log($event.target.value)

      if ($event.target.value.trim().length <= 4) {
        return
      }

      store.dispatch('updateTodo', {
        id: props.todo.id,
        title: $event.target.value.trim(),
        completed: props.todo.completed,
      })
    }

    const toggleCompletedTodo = () => {
      store.dispatch('toggleCompletedTodo', props.todo)
      isComplete.value = !isComplete.value
    }

    return {
      isComplete,
      removeTodo,
      updatedTodo,
      toggleCompletedTodo,
    }
  },
}
</script>
