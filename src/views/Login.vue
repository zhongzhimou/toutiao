<template>
<!-- 
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

    <!-- form表单页面 -->
    <!-- <div class="form">
      用户名
      <div class="form-item">
        <input placeholder="手机号码" v-model="form.username"/>
      </div>
      密码
      <div class="form-item">
        <input type="password" placeholder="请输入密码" v-model="form.password"/>
      </div>
      按钮
      <div class="form-item">
        <button @click='handleClick'>登录</button>
      </div>
    </div> -->


    <!-- 插件的form表单页面 -->
    <van-form @submit="onSubmit" class="form">
  <van-field
    v-model="form.username"
    name="手机号码"
    placeholder="手机号码"
    :rules="[{ required: true, message: '请填写手机号码' }]"
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
      登录
    </van-button>
  </div>
</van-form>

  <router-link to='/register'>
    <van-button round block class="lick-register">
      注册
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
        password:''
      }
    }
  },
  methods: {
    // handleClick(){
    //   // 当双向数据绑定好form表单,就发送axios 异步请求
    //   this.$axios({
    //     // 接口地址
    //     url:'http://127.0.0.1:3000/login',
    //     method:'POST',
    //     // 获取数据模板里面form表单的数据
    //     data:this.form
    //     ///then方法里面的函数就是数据成功后执行的代码  相当于success
    //   }).then(res => {
    //     console.log(res);
    //     // 获取返回信息
    //     // res.data: 后台数据 结构到 {message} 结构出来的是message的值"登录成功"
    //     const {message} = res.data
    //      // 提示的模态框  把变量('登录成功')赋值进去
    //   this.$toast.success(message)
    //   })
    // }
   onSubmit(values) {
      console.log('submit', values);
        this.$axios({
        // 接口地址
        url:'/login',
        method:'POST',
        // 获取数据模板里面form表单的数据
        data:this.form
        ///then方法里面的函数就是数据成功后执行的代码  相当于success
      }).then(res => {
        console.log(res);
        // 获取返回信息
        // res.data: 后台数据 结构到 {message} 结构出来的是message的值"登录成功"
        const {message,data} = res.data;
         // 提示的模态框  把变量('登录成功')赋值进去
      this.$toast.success(message)

      // 把token值 存到内存中
      localStorage.setItem('userInfo',JSON.stringify(data));
      // 保存好token后跳转到个人页
      // location.href('/register')  // 报错：location.href is not a function
      this.$router.push('/personal')
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


// .form-item {
//   margin-top: 18 / 360 * 100vw;
// }
// .form-item input {
//   width: 100%;
//   height: 44 / 360 * 100vw;
//   // 内减模式
//   box-sizing: border-box;
//   line-height: 44 / 360 * 100vw;
//   font-size: 16px;
//   background: none;
//   border: none;
//   border-bottom: 1px #999 solid;
//   // 去掉点击时的边框
//   outline: none;
// }
// .form-item button{
//   width: 100%;
//   height: 48 / 360 * 100vw;
//   background: #cc3300;
//   color: #fff;
//   border-radius: 50px;
//   border:none;//去掉边框
//   outline: none;// 点击时去掉边框
//   margin-top:50 / 360 * 100vw;
// }

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