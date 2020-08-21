import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    addCount (state) {
      state.count++
    }
  },
  actions: {
    addCount (context) {
      context.commit('addCount')
    }
  },
  modules: {
  }
})
