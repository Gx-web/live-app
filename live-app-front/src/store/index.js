import Vue from 'vue'
import Vuex from 'vuex'
import user from "../apis/User/user"
import home from "./home"
import data from "../apis/data/DataApi"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    vip: ""
  },
  mutations: {
    'INIT': (state, a) => {
      state.data = a;
    },
    'VIPMU': (state, a) => {
      state.vip = a.toString();
      console.log(state.vip);
    },
    'GETNAME':(state,a) => {
      // console.log(state.data.data.userid)
      // console.log(a)
      state.data.data.username = a
    },
    'GETAUTOGRAPH':(state,a) => {
      // console.log(state.data.data.userid)
      // console.log(a)
      state.data.data.autograph = a
    }
  },
  actions: {
    'INITDATA': async ({ commit }, id) => {
      // console.log(id);

      // let a = await user.getUserdata(id)
      let a = await require("../mocks/User.json")
      // console.log(a);
      commit('INIT', a)
    },
    'INITNAME':async ({ commit }, id) => {
      // console.log(id)
      commit('GETNAME',id)
    },
    'INITAUTOGRAPH':async ({ commit }, id) => {
      // console.log(id)
      commit('GETAUTOGRAPH',id)
    }
  },
  getters: {
    'GETDATA': ({ data }) => {
      return data
    },
    'GETVIP': ({ vip }) => {
      return vip
    }
  },
  modules: {
    home,data
  }
})
