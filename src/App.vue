<template>
  <header class="border-b border-gray-50">
    <nav class="flex gap-10 max-w-7xl mx-auto w-full px-5 py-8">
      <router-link class="text-white" to="/">Home</router-link>
      <router-link class="text-white" to="/tasks-completed"
        >Tarefas concluidas</router-link
      >
    </nav>
  </header>
  <router-view />
</template>
