<template>
  <div class="tab-control">
    <div class="tab-control-item" 
        v-for="(item,index) in title" :key="index"
        :class="{active: index === currentIndex}"
        @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'TabControl',
    props:{
      title:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        currentIndex: 0
      }
    },
    methods: {
      tabClick(index){
        this.currentIndex = index;
        this.$emit('tabClick',index)
      }
    },
  }
</script>

<style>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
  }
  .tab-control-item{
    flex:1
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text)
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>