<template>
  <div>
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
      <v-btn fab small @click.stop="$router.push({ path: '/create/article' })"
        ><v-icon>mdi-book-plus-multiple-outline</v-icon></v-btn
      >
      <v-btn fab small @click.stop="loginForm = !loginForm" v-if="!$store.state.isLogin"
        ><v-icon>mdi-account</v-icon></v-btn
      >
      <v-btn fab small @click.stop="userLogout()" v-else
        ><v-icon>mdi-account-arrow-right</v-icon></v-btn
      >
    </v-speed-dial>
    <v-btn fab color="primary" fixed bottom right @click="toTop()" v-else>
      <v-icon>mdi-keyboard-caps</v-icon>
    </v-btn>
    <!-- 登陆表单 -->
    <v-dialog persistent v-model="loginForm" max-width="500">
      <v-card>
        <v-toolbar color="indigo" dark flat>
          <v-toolbar-title>用户登录</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text class="pa-5">
          <v-form>
            <v-text-field
              label="邮箱"
              name="email"
              prepend-icon="mdi-account"
              type="text"
              v-model="loginInfo.email"
            />
            <v-text-field
              id="password"
              label="密码"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="loginInfo.password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="loginForm = false">
            关闭
          </v-btn>
          <v-btn color="indigo white--text" v-on:click="userLogin()">登陆</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ScrollBackToTopButton',
  data: () => ({
    isOpen: false,
    isScroll: false,
    loginInfo: {},
    loginForm: false
  }),
  mounted() {
    window.addEventListener('scroll', this.onScroll, true)
    this.fastLogin()
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.isScroll = top > 20
    },
    toTop() {
      this.$vuetify.goTo(0)
    },
    userLogin() {
      this.$store.dispatch('login', this.loginInfo)
    },
    userLogout() {
      this.$store.dispatch('logout')
    },
    fastLogin() {
      this.$store.dispatch('fastLogin')
    }
  }
}
</script>

<style></style>
