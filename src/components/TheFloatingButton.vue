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
      <v-btn fab small @click.stop="changeLang()"
        ><v-icon>mdi-translate</v-icon></v-btn
      >
      <v-btn fab small @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
        ><v-icon>mdi-theme-light-dark</v-icon></v-btn
      >
      <v-btn fab small @click.stop="$router.push({ path: '/create/article' })"
        ><v-icon>mdi-book-plus-multiple-outline</v-icon></v-btn
      >
      <v-btn
        fab
        small
        @click.stop="loginForm = !loginForm"
        v-if="!$store.state.isLogin"
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
              v-on:keyup.enter="userLogin()"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="loginForm = false">
            关闭
          </v-btn>
          <v-btn
            color="indigo white--text"
            v-on:click="userLogin()"
            :loading="loginLoading"
            >登陆</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <message-bar
      :show.sync="messageBar"
      timeout="2000"
      :text="messageBarText"
    ></message-bar>
  </div>
</template>

<script>
import MessageBar from '@/components/MessageBar.vue'
import * as moment from 'moment'
export default {
  name: 'ScrollBackToTopButton',
  components: {
    'message-bar': MessageBar
  },
  data: () => ({
    isOpen: false,
    isScroll: false,
    loginInfo: {},
    loginForm: false,
    loginLoading: false,
    messageBar: false,
    messageBarText: '登录成功',
    lang: null
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
    },
    userLogin() {
      this.loginLoading = true
      const userForm = new FormData()
      userForm.append('username', this.loginInfo.email)
      userForm.append('password', this.loginInfo.password)
      this.$axios.post('api/login', userForm).then(response => {
        if (response.data.code === 200) {
          this.$store.commit('login', response.data.data)
          this.loginLoading = false
          this.showMessageBar('登录成功', 2000)
          this.loginForm = false
        } else {
          this.showMessageBar('登录失败，账号或密码错误！', 2000)
          this.loginLoading = false
        }
      })
    },
    userLogout() {
      this.$store.dispatch('logout')
      this.showMessageBar('已成功登出', 2000)
    },
    showMessageBar(message, timeout) {
      this.messageBarText = message
      this.messageBar = true
      setTimeout(() => {
        this.messageBar = false
      }, timeout)
    },
    changeLang() {
      if (this.$i18n.locale === 'zh-CN') {
        this.$i18n.locale = 'en-US'
      } else {
        this.$i18n.locale = 'zh-CN'
      }
      moment.locale(this.$i18n.locale)
    }
  }
}
</script>

<style></style>
