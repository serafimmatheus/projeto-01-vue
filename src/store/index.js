import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    todos: []
  },
  getters: {
  },
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload
    },
    storeTodo(state, payload) {
      const index = state.todos.findIndex((todo) => todo.id === payload.id)

      if (index >= 0) {
       return state.todos.slice(index, 1, payload)
      }
      state.todos.unshift(payload)
    },
    removeTodo(state, payloadId) {
      state.todos = state.todos.filter((todo) => todo.id !== payloadId)
    },
    updateTodo(state, payload) {
      const index = state.todos.findIndex((todo) => todo.id === payload.id)
      state.todos[index].title = payload.title
    },
    toggleCompletedTodo(state, payload) {
      const index = state.todos.findIndex((todo) => todo.id === payload.id)
      state.todos[index].completed = payload.completed
    }
  },
  actions: {
   async fetchTodos({ commit }) {
     return await axios
      .get('http://localhost:8081/todos')
      .then((response) => {
        commit('storeTodos', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },

    async addTodo({ commit }, payload) {
      return await axios
        .post('http://localhost:8081/todos', payload)
        .then(() => {
          commit('storeTodo', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async removeTodo({ commit }, payloadId) {
      return await axios
        .delete(`http://localhost:8081/todos/${payloadId}`)
        .then(() => {
          commit('removeTodo', payloadId)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async toggleCompletedTodo({ commit }, payload) {
      return await axios
        .patch(`http://localhost:8081/todos/${payload.id}`, {
          completed: payload.completed ? false : true
        })
        .then(() => {
          commit('toggleCompletedTodo', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async updateTodo({commit}, payload) {
      return await axios
        .put(`http://localhost:8081/todos/${payload.id}`, {
          id: payload.id,
          title: payload.title,
          completed: payload.completed
        })
        .then(() => {
          commit('storeTodo', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
