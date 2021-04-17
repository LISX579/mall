import {
  ADD_COUNTER,
  ADD_TO_CART,
  SET_TABBAR_SHOW,
} from './mutation-types'

export default {
  [ADD_COUNTER](state, payload) {
    this.state.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  [SET_TABBAR_SHOW](state, bol) {
    state.tabBarShow = bol;
  },
}
