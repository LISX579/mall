export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  tabBarShow: state => state.tabBarShow,
};
