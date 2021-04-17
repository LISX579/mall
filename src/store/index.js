import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

Vue.use(Vuex)

const state = {
  cartList: [],
  tabBarShow: true,
}

export default new Vuex.Store({
  state,
  //mutations唯一的目的就是修改state中状态
  //mutations中的每个方法尽可能完成的事情比较单一
  mutations: mutations,
  actions,
  getters,
})
