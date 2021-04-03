<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
  <router-view/>
</template>

<script> 
import MainTabBar from 'components/content/maintabbar/MainTabBar';
export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>

<style lang="less">

</style>
