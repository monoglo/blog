<template>
  <v-app>
    <blog-navbar></blog-navbar>
    <scroll-to-top></scroll-to-top>
    <v-main>
      <!-- <HelloWorld/> -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import TheFloatingButton from '@/components/TheFloatingButton'

export default {
  name: 'App',

  components: {
    'blog-navbar': TheNavbar,
    'scroll-to-top': TheFloatingButton
  },
  data: () => ({
    fab: false
  })
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
