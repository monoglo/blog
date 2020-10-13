<template>
  <div>
    <v-navigation-drawer app permanent>
      <v-list class="primary">

        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              src="//i0.hdslb.com/bfs/face/0138f6c4c55808f0af148587bf83a9419524757f.jpg@70w_70h_1c_100q.webp"
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
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>首页</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>标签</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>归档</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-footer fixed padless>
        <v-card flat tile width="100%" class="primary text-center">
          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>rankofmatrix.com</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-navigation-drawer>

    <v-app-bar app dense elevate-on-scroll color="red">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    fab: false
  })
}
</script>

<style scoped></style>
