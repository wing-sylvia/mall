<template>
<div class="cart">
  <nav-bar class="cartnav">
    <template v-slot:center>
      购物车({{cartLength}})
    </template>
  </nav-bar>
  <cart-list></cart-list>
  <cart-bottom-bar></cart-bottom-bar>
</div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar';

  import {mapGetters} from 'vuex'

  export default {
    name:'cart',
    components:{
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed:{
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style>
  .cartnav{
    background-color: var(--color-tint);
    color: #fff;
  }
  .cart{
    height: calc(100% - 49px);
  }
</style>