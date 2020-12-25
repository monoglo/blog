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
    login({ commit }, { email, password }) {
      const userForm = new FormData()
      userForm.append('username', email)
      userForm.append('password', password)
      Vue.axios.post('api/login', userForm)
        .then(response => {
          commit('login', response.data.data)
        })
    },
    logout({ commit }) {
      Vue.axios.get('api/logout').then(response => {
        commit('logout')
      })
    },
    fastLogin({ commit }) {
      Vue.axios.get('api/users/login/fast')
        .then(response => {
          commit('login', response.data.data)
        }).catch(() => { })
    }
  }
})
