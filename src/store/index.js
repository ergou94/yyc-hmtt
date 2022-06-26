import Vue from 'vue'
import Vuex from 'vuex'
import Vuexpersist from 'vuex-persist'
const vuelocal = new Vuexpersist({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
  },
  mutations: {
    SetUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuelocal.plugin]
})
