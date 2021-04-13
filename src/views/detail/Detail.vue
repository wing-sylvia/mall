<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick = 'titleClick' ref="detailNav" />
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll = 'contentScroll'>
      <detail-swiper :top-imgs = 'topImages'>
      </detail-swiper>
      <detail-base-info :goods = 'goodsInfo'/>
      <detail-shop-info :shop = 'shop'/>
      <detail-goods-info :detail-info = 'detailInfo' @detailImgLoad = 'detailImgLoad'/>
      <detail-param-info :param-info = 'paramInfo' ref="param"/>
      <detail-comment-info :comment-info = 'commentInfo' ref="comment"/>
      <good-list :goods = 'recommends' ref="recommend"/>
    </scroll>
    <back-top @click="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart = 'addToCart' class="detailBtm"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper  from './childComps/DetailSwiper'
  import DetailBaseInfo  from './childComps/DetailBaseInfo'
  import DetailShopInfo  from './childComps/DetailShopInfo'
  import DetailGoodsInfo  from './childComps/DetailGoodsInfo'
  import DetailParamInfo  from './childComps/DetailParamInfo'
  import DetailCommentInfo  from './childComps/DetailCommentInfo'
  import DetailBottomBar  from './childComps/DetailBottomBar'

  import GoodList  from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail,getRecommend} from 'network/detail'
  import {Goods,Shop,GoodsParam} from 'network/detail'
  import {itemImageListenerMixin,backTopMixin} from 'common/mixin'

  import {mapActions} from 'vuex';
  import {debounce} from 'common/utils'
  
  export default {
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodList,
      Scroll
    },
    data(){
      return{
        iid: null,
        topImages: [],
        goodsInfo:{},
        shop:{},
        detailInfo:{},
        paramInfo: {},
        commentInfo: {},
        recommends:[],
        themeTopYs:[],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    mixins:[itemImageListenerMixin,backTopMixin],
    created(){
      //1.保存商品的iid
      this.iid = this.$route.params.iid;
      //2.根据iid请求数据
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        //2.1获取顶部轮播图图片
        this.topImages = data.itemInfo.topImages
        setTimeout(() => {
          this.$refs.scroll.refresh()
        },200)
        //2.2获取商品信息
        this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //2.3获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 2.4获取商品详细信息
        this.detailInfo = data.detailInfo
        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        // 6.获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
        // setTimeout(() => {
        //   this.$refs.scroll.refresh()
        // },200)
      })
      // 3.获取推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
        console.log(res);
      })
      // 联动效果
      this.getThemeTopY = debounce(() => {
        this.$nextTick(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
          // console.log(this.themeTopYs);
        })
      }) 
    },
    mounted(){
    },
    destoryed(){
      this.$bus.off('imageLoad', this.itemImageListener);
    },
    methods: {
      ...mapActions(['addCart']),
      // 4.监听图片加载完成
      detailImgLoad(){
        // 可滚动区域刷新
        this.refresh()
        // console.log('load');
        // 获取各个标题的offsetTop值
        this.getThemeTopY()
      },
      titleClick(index){
        // 点击标题，跳转到指定位置
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
        // console.log(position);
        this.listenBackShow(position)
        const length = this.themeTopYs.length
        const positionY = - position.y
        for(let i = 0; i < length - 1; i ++){
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i,
            this.$refs.detailNav.currentIndex = this.currentIndex
            // console.log(this.currentIndex);
          }
        }
      },
      addToCart(){
        // 1.获取商品需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goodsInfo.title;
        product.desc = this.goodsInfo.desc;
        product.price = this.goodsInfo.lowNowPrice;
        product.iid = this.iid;

        // 2.将商品添加到购物车
        this.addCart(product).then(res => {
          console.log(res);
        })

        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })
        // this.$toast.show('加入购物车成功',2000)
      }
    },
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    height:calc(100% - 44px - 62px)
  }

</style>