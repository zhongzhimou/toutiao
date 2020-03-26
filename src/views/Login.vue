<template>
  <div class="container">
    <!-- 关闭按钮--返回上一页 -->
    <div class="back-btn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <!-- new字体图标 -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- form表单页面 -->
    <div class="form">
      <!-- 用户名 -->
      <div class="form-item">
        <input placeholder="手机号码" />
      </div>
      <!-- 密码 -->
      <div class="form-item">
        <input type="password" placeholder="请输入密码" />
      </div>
      <!-- 按钮 -->
      <div class="form-item">
        <button>登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>
.container {
  padding: 20 / 360 * 100vw;
}
.back-btn span {
  font-size: 27 / 360 * 100vw;
  line-height: 0;
}
.logo {
  text-align: center;
  margin-top: 20 / 360 * 100vw;
}
.logo span {
  font-size: 126 / 360 * 100vw;
  color: #cc3300;
}
.form-item {
  margin-top: 18 / 360 * 100vw;
}
.form-item input {
  width: 100%;
  height: 44 / 360 * 100vw;
  // 内减模式
  box-sizing: border-box;
  line-height: 44 / 360 * 100vw;
  font-size: 16px;
  background: none;
  border: none;
  border-bottom: 1px #999 solid;
  // 去掉点击时的边框
  outline: none;
}
.form-item button{
  width: 100%;
  height: 48 / 360 * 100vw;
  background: #cc3300;
  color: #fff;
  border-radius: 50px;
  border:none;//去掉边框
  outline: none;// 点击时去掉边框
  margin-top:50 / 360 * 100vw;

}
</style>