<template>
  <div class="navigate-bar">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <strong>{{title}}</strong>
      <span class="iconfont iconshouye" @click="$router.push('/')"
      v-if="showHome"></span>
      <span v-else class="iconfont iconshouye"
      style="opacity:0"></span>
    </div>
</template>

<script>
export default {
props:['showHome','title']
}
</script>

<style lang="less" scoped>
@px: 360 /100vw;
.navigate-bar {
  line-height: 48 / @px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 0 20 / @px;
  .iconshouye {
    font-size: 20px;
  }
}
</style>