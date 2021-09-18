<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <!-- <keep-alive> -->
    <blog-navbar></blog-navbar>
    <!-- </keep-alive> -->
    <scroll-to-top></scroll-to-top>
    <v-main>
      <keep-alive include="ArticleList,TagList,SearchArticlePage">
        <router-view></router-view>
      </keep-alive>
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
  }),

  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    }
  },

  mounted() {
    this.getLang()
  },

  methods: {
    getLang() {
      console.info(navigator.language)
      this.$i18n.locale = navigator.language
    }
  }
}
</script>
