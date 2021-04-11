import {debounce} from 'common/utils.js';
import BackTop from 'components/content/backtop/BackTop';

export const itemImageListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      refresh: null
    }
  },
  mounted(){
    this.refresh = debounce(this.$refs.scroll.refresh,50)
    this.itemImageListener = () => {
      this.refresh()
    }
    this.$bus.on('imageLoad', this.itemImageListener);
    // console.log('mixin');
  },
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components:{
    BackTop,
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    listenBackShow(position){
      this.isShowBackTop = (-position.y) > 1000
    }
  },
}