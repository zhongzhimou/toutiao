<template>
<!--     ---------------  注册页  ----------------
错误地方：
  1、v-model="password"  缺少：form.
  2、this.$axios({  methods:'POST'  })   methods  多了一个s


 -->
  <div class="container">
    <!-- 关闭按钮--返回上一页 -->
    <div class="back-btn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <!-- new字体图标 -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>



    <!-- 插件的form表单页面 -->
    <van-form @submit="onSubmit" class="form">
  <van-field
    v-model="form.username"
    name="手机号码"
    placeholder="手机号码"
    :rules="[{ required: true, message: '请填写手机号码' }]"
  />
  <van-field
    v-model="form.nickname"
    name="昵称"
    placeholder="请输入昵称"
    :rules="[{ required: true, message: '请填写昵称' }]"
  />
  <van-field
    v-model="form.password"
    type="password"
    name="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div>
    <van-button round block type="info" native-type="submit">
      注册
    </van-button>
  </div>
</van-form>

  <router-link to='/login'>
    <van-button round block class="lick-register">
      登录
    </van-button>
    </router-link>
  
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 保存表单数据 -- 接口文档所需要的参数名字
      form:{
        username:'',
        password:'',
        nickname:'',
      }
    }
  },
  methods: {
  
   onSubmit(values) {
      
      console.log('submit', values);
        this.$axios({
        // 接口地址
        url:'/register',
        method:'POST',
        // 获取数据模板里面form表单的数据
        data:this.form
        ///then方法里面的函数就是数据成功后执行的代码  相当于success
      }).then(res => {
      
        // 获取返回信息
        // res.data: 后台数据 结构到 {message} 结构出来的是message的值"登录成功"
        const {message} = res.data
        
         // 提示的模态框  把变量('登录成功')赋值进去
      this.$toast.success(message)
      })
    },
  },
};
</script>

<style lang='less' scoped>
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



.form{
  .van-cell{
    padding: 10px 0;
    font-size: 16px;
    margin-top:20 / 360 * 100vw;
  }
  .van-cell:not(:last-child)::after{
    border-bottom: 1px solid #333;
    left: 0;
  }
  .van-button--info{
    background-color: #cc3300;
    border:1px solid #cc3300;
    margin-top: 50 / 360 * 100vw;
  }
}
.lick-register{
  margin-top: 20 / 360 * 100vw;
  border:none;
}
</style>