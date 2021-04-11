<template>
  <nav-bar>
    <template v-slot:left>
      <img src="~assets/image/common/back.svg" alt="" 
            @click="detailBack"
            class="back">
    </template>
    <template v-slot:center >
      <div class="title">
        <div class="title-item" v-for="(item,index) in title" :key="index"
              :class="{isActive: currentIndex === index}"
              @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name:'DetailNavBar',
    components:{
      NavBar,
    },
    data(){
      return {
        title:['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      detailBack(){
        this.$router.back()
      },
      titleClick(index){
        this.currentIndex = index
        this.$emit('titleClick',index)
      }
    },
  }
</script>

<style scoped>
  .title{
    margin-top: 2px;
    display: flex;  
    font-size: 15px;

  }
  .title-item{
    flex: 1;
    /* justify-content: center; */
  }
  .back{
    margin-top: 13px;
  }
  .isActive{
    color:var(--color-tint)
  }
</style>