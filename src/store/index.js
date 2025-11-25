import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from "@/store/modules/permission";
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    permission
  },
  getters,
  plugins: [createPersistedState()]
})

export default store
