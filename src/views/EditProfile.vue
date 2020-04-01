<template>
  <!--      ------------------  编辑资料  ------------------      -->
  <div>
    <NavigateBar title="编辑资料" :showHome="false" />
    <div class="avatar">
      <img :src=" $axios.defaults.baseURL + userInfo.head_img" alt />
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <Listbar aaa="昵称" :bbb="userInfo.nickname" @click.native="show = true" />
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="handleNickName">
      <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>
    <!-- 二、当点击密码时触发v-model赋值为true,显示更改密码 -->
    <Listbar aaa="密码" bbb="******"  @click.native="showPassword = true" />
    <!-- 一、插件声明的v-model='',如果为false为隐藏,true为显示 data 默认一个false-->
    <van-dialog v-model="showPassword" title="修改密码" show-cancel-button @confirm="handlePassword">
      <!-- 将此时更改的password,存储到data -->
      <van-field v-model="password" placeholder="请输入密码"  type="password" />
    </van-dialog>
    <Listbar aaa="性别" :bbb="['女','男'][userInfo.gender]" @click.native="showGender = true"/>
    <van-action-sheet v-model="showGender" close-on-click-action :actions="actions"  @select="onSelect"/>
  </div>
</template>

<script>
import NavigateBar from "@/components/NavigateBar";
import Listbar from "@/components/Listbar";
import moment from "moment";

export default {
  data() {
    return {
      // 缓存中的所有用户信息 包括id 和 token
      userData: {},
      // 用户的个人信息
      userInfo: {},
      show:false,
      showPassword:false,
      showGender:false,
      nickname:'',
      password:'',
      actions:[
        {name:'男',value:1},
        {name:'女',value:0}
      ]
    };
  },
  methods: {
    afterRead(file) {
      // file点击上传后的图片地址
      // console.log(file);

      // 上传文件 需要用  FromDada表单上传
      const fromDate = new FormData();
      // 给fromDate添加一个属性,并且添加文件对象 (第一个file是属性,第二个是文件对象)
      fromDate.append("file", file.file);
      // 发送axios请求,把头像图片上传内存
      this.$axios({
        url: "/upload",
        method: "POST",
        headers: {
          Authorization: this.userData.token
        },
        // fromDate 有自己的请求头和格式  不过axios有自动识别,所以不用手动加
        data: fromDate
      }).then(res => {
        // console.log(res);
        // 解构图片地址,赋值给头像  暂时传图片
        const { url } = res.data.data;
        this.userInfo.head_img = url;
        this.handleEdit({
          head_img:url
        })
      });
    },
    // 封装一个将数据 保存到服务器的函数
    handleEdit(data){
      this.$axios({
        method:'POST',
        url:'/user_update/'+ this.userData.user.id,
        headers: {
          Authorization: this.userData.token
        },
        data,
      }).then(res => {
        // console.log(res);
        this.$toast.success('修改成功')
      })
    },
    handleNickName(){
      // nickname是后台需要传入的参数,this.nickname是data用户修改的昵称,因为有v-model绑定所以可以传值
       this.handleEdit({nickname:this.nickname});
       this.userInfo.nickname = this.nickname
    },
    handlePassword(){
      // password是后台需要传入的参数,this.password是data用户修改的密码,因为有v-model绑定所以可以传值
      this.handleEdit({password:this.password});
    },
    onSelect(item){
      this.handleEdit({gender:item.value});
      this.userInfo.gender = item.value;
    }
  },
  mounted() {
    // 因为需要id和token  所以获取后台的用户数据
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    
    
    // 把数据存入data
    this.userData = userData;
    // console.log(userData);
    this.$axios({
      url: "/user/" + userData.user.id,
      // 配置请求头信息
      headers: {
        Authorization: userData.token
      }
    }).then(res => {
      // console.log(res);
      // 用户的数据保存到data
      const { data } = res.data;
      this.userInfo = data;
      this.nickname = data.nickname;
      console.log(this.userInfo);
    });
  },
  components: {
    NavigateBar,
    Listbar
  }
};
</script>

<style scoped lang='less'>
@px: 360 / 100vw;
.avatar {
  position: relative;
  display: flex;
  padding: 20 / @px;
  justify-content: center;
  align-items: center;
  img {
    // display: block;
    width: 100 / @px;
    height: 100 / @px;
    // object-fit: contain;
    border-radius: 50%;
  }
  .uploader {
    position: absolute;
    width: 100 / @px;
    height: 100 / @px;
    left: 50%;
    top: 50%;
    transform: translate(-50 / @px, -50 / @px);
    opacity: 0;
  }
}
</style>