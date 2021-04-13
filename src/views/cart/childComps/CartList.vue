<template>
  <div class="cartList">
    <scroll class="content">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info = 'item'></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import CartListItem from './CartListItem';

  import {mapGetters} from 'vuex';

  export default {
    name:'CartList',
    components:{
      Scroll,
      CartListItem,
    },
    computed:{
      ...mapGetters(['cartList'])
    }
  }
</script>

<style>
/* .cartList{
  height: ;
  overflow: hidden;
} */
.content{
  height: calc(100vh - 44px - 49px);
}
</style>