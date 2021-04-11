<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view></router-view>
    
    </keep-alive> -->
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script type="module">
import MainTabBar from 'components/content/maintabbar/MainTabBar';

export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>


<style lang="less">
  @import "assets/css/base.css";
</style>
