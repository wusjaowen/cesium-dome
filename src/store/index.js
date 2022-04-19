import Vue from "vue"
import Vuex from "vuex"
import mutations from './mutations'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
   userInfo:null,
   routeName:'/vmap'
}
const getters = {
  openId: state => state.openId,
  
}
const store =  new Vuex.Store({
    state,
    getters,
    mutations,
    
})

export default store
