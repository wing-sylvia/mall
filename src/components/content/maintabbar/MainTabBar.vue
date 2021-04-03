<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="blue">
        <template v-slot:item-icon>
          <img  src="~assets/image/tabbar/home.png" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img  src="~assets/image/tabbar/home_active.png" alt="">
        </template>
        <template v-slot:item-text> 
          <div>首页</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <template v-slot:item-icon>
          <img  src="~assets/image/tabbar/categories.png" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img  src="~assets/image/tabbar/categories_active.png" alt="">
        </template>
        <template v-slot:item-text> 
          <div>分类</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="cart">
        <template v-slot:item-icon>
          <img  src="~assets/image/tabbar/shopcart.png" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img  src="~assets/image/tabbar/shopcart_active.png" alt="">
        </template>
        <template v-slot:item-text> 
          <div>购物车</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="profile">
        <template v-slot:item-icon>
          <img  src="~assets/image/tabbar/profile.png" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img  src="~assets/image/tabbar/profile_active.png" alt="">
        </template>
        <template v-slot:item-text> 
          <div>我的</div>
        </template>
      </tab-bar-item>
      
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue';
export default {
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>