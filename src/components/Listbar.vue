<template>
  <div class="listbar" >
      <router-link to='#' >
        <div>{{aaa}}</div>
        <div class="tips">
        {{bbb}}<span class="iconfont iconjiantou1"></span>
      </div>
      </router-link>
    </div>
</template>

<script>

export default {

  props: ['aaa', 'bbb'],
  data(){
    return{
      
    }
  },
  // mounted(){
  //   this.$emit('heandle')
  // }
}
</script>

<style lang="less" scoped>
  

 .listbar{
   @px: 360 / 100vw;
    padding: 0 20/ @px;
    height: 48 / @px;
    line-height: 48 / @px;
    font-size: 16 / @px;
    a{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    }
    .tips{
      color: #999;
      span{
        margin-left: 5 / @px;
      }
    }
  }
</style>