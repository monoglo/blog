<template>
  <div>
    <v-navigation-drawer app v-model="drawer">
      <v-list class="pink accent-2">
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              v-ripple
              style="cursor: pointer"
              src="https://avatars3.githubusercontent.com/u/26409918?s=460&u=8ab96862a3e98c853128accca654790fc15cdaaa&v=4"
              @click.stop="goToGithub()"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title white--text">
              伟大人类联邦
            </v-list-item-title>
            <v-list-item-subtitle class="white--text"
              >monoglo37@gmail.com</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link @click.stop="$router.push({ path: '/' }, () => {})">
          <v-list-item-icon>
            <v-icon>mdi-layers-triple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>首页</v-list-item-title>
        </v-list-item>
        <v-list-item link @click.stop="$router.push({ path: '/tag' })">
          <v-list-item-icon>
            <v-icon>mdi-tag-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>标签</v-list-item-title>
        </v-list-item>
        <v-list-item link @click.stop="$router.push({ path: '/article/19' })">
          <v-list-item-icon>
            <v-icon>mdi-information-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>关于</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-footer fixed padless>
        <v-card
          flat
          tile
          v-ripple
          width="100%"
          class="pink accent-2 text-center"
        >
          <v-toolbar>
            <v-switch
              v-model="$vuetify.theme.dark"
              inset
              hide-details
              color="dark"
            ></v-switch>
            夜间模式
          </v-toolbar>
          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>rankofmatrix.com</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-navigation-drawer>

    <v-app-bar app dense elevate-on-scroll color="indigo">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        color="white"
      ></v-app-bar-nav-icon>
      <v-spacer class="d-none d-md-flex"></v-spacer>
      <v-text-field
        v-model="searchBar"
        dark
        color="indigo"
        class="shrink mt-6"
        label="Search"
        prepend-inner-icon="mdi-layers-search"
        solo-inverted
        dense
        clearable
        filled
        rounded
        @keydown.enter="goSearchPage()"
      ></v-text-field>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    drawer: true,
    searchBar: ''
  }),
  mounted() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.$vuetify.theme.dark = true
    }
  },
  methods: {
    goToGithub() {
      window.open('https://github.com/monoglo', '_blank')
    },
    goSearchPage() {
      // this.$router.push({ path: '/search?keyword=' + this.searchBar })
      window.open('/search?keyword=' + this.searchBar, '_blank')
    }
  }
}
</script>

<style scoped></style>
