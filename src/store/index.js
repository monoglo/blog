import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginUser: {}
  },
  getters: {},
  mutations: {
    login(state, loginUser) {
      state.isLogin = true
      state.loginUser = loginUser
    },
    logout(state) {
      state.isLogin = false
      state.loginUser = {}
    }
  },
  actions: {
    logout({ commit }) {
      Vue.axios.get('api/users/logout').then(response => {
        commit('logout')
      })
    }
  }
})
