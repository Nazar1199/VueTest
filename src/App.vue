<script setup lang="ts">
  import HelloWorld from './components/HelloWorld.vue'
  import TheWelcome from './components/TheWelcome.vue'
  import UserList from './components/UserList.vue'
</script>

<template>
    <UserList/>
</template>

<style>
  :root {
    --color-background: #f1f1f1;
  }
  #app {
    grid-template-columns: auto;
  }
</style>
