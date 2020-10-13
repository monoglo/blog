<template>
  <v-app>
    <blog-navbar></blog-navbar>
    <scroll-to-top></scroll-to-top>
    <v-main>
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
