<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button @click.native = "checkClick"
                    :is-checked="isSelectAll"
                    class="check-button"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex'

export default {
  name: "cartBottomBar",
  components: {CheckButton},
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      // return !(this.cartList.filter(item => !item.checked).length)
      if(this.cartList.length === 0) return false
      return !(this.cartList.find(item => !item.checked))
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {

    }
  }
}
</script>

<style scoped>
.bottom-bar{
  position: relative;
  display: flex;

  line-height: 40px;
  height: 40px;
  bottom: 0px;

  background-color: #eee;
  font-size: 14px;
}

.price{
  margin-left: 60px ;
  align-items: center;
  flex: 1;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.calculate{
  width: 90px;
  text-align: center;
  background-color: var(--color-tint);
  color: white;
}
</style>
