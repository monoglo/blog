<template>
  <v-speed-dial v-model="isOpen" fixed bottom right v-if="!isScroll">
    <!-- 大按钮 -->
    <template v-slot:activator>
      <v-btn fab color="primary">
        <v-icon v-if="isOpen">mdi-close</v-icon>
        <v-icon v-else>mdi-account</v-icon>
      </v-btn>
    </template>
    <!-- 小按钮组 -->
    <v-btn fab small @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
      ><v-icon>mdi-theme-light-dark</v-icon></v-btn
    >
    <v-btn fab small><v-icon>mdi-account</v-icon></v-btn>
    <v-btn fab small><v-icon>mdi-account</v-icon></v-btn>
  </v-speed-dial>
  <v-btn fab color="primary" fixed bottom right @click="toTop()" v-else>
    <v-icon>mdi-keyboard-caps</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ScrollBackToTopButton',
  data: () => ({
    isOpen: false,
    isScroll: false
  }),
  mounted() {
    window.addEventListener('scroll', this.onScroll, true)
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.isScroll = top > 20
    },
    toTop() {
      this.$vuetify.goTo(0)
    }
  }
}
</script>

<style></style>
