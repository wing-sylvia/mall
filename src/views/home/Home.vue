<template>
  <div id="home" class="wrapper" >
    <nav-bar class="home-nav">
      <template v-slot:center>
        购物街
      </template>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners = banners />
      <recommend-view :recommends = recommends />
      <feature-view />
      <tab-control :title = title class="tab-control" @tabClick = "tabClick"></tab-control>
      <goods-list :goods = "ShowGoods"/>
    </scroll>
    <back-top @click="backClick" v-show="isShowBackTop"/>
  </div>
  
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import Scroll from 'components/common/scroll/Scroll';

  import HomeSwiper from './childComps/homeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backtop/BackTop';
  import {getHomeMultidata,getHomeGoods} from '../../network/home'

  export default {
    name:'Home',
    components:{
      NavBar,
      TabControl,
      Scroll,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      BackTop,
    },                                
    data(){
      return {
        banners:[],
        recommends:[],
        title:['流行','新款','精选'],
        goods:{
          'pop':{page: 0,list: []},
          'new':{page: 0,list: []},
          'sell':{page: 0,list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
      }
    },
    created(){
      this.getHomeMultidata();
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed:{
      ShowGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /* 事件监听方法 */
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      /* 网络请求方法 */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    },
  }
</script>
<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/
</style>