import Vue from 'vue'
import Vuex from 'vuex'
import Vuexpersist from 'vuex-persist'
const vuelocal = new Vuexpersist({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    SetUser (state, payload) {
      state.user = payload
    },
    setSearchHistoryList (state, payload) {
      let arr = state.searchHistoryList
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.searchHistoryList = arr
    },
    delHistory (state, payload) {
      state.searchHistoryList.splice(payload, 1)
    },
    delAllHistory (state) {
      state.searchHistoryList = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuelocal.plugin]
})
