<template>
  <!--      ------------------  个人首页  ------------------      -->
  <div class="container">
    <!-- 顶部导航栏 -->
    <div class="navigate-bar">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <strong>个人中心</strong>
      <span class="iconfont iconshouye" @click="$router.push('/')"></span>
    </div>
    <!-- 头部 -->
    <div class="header">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="$axios.defaults.baseURL + personal.head_img" />
      </div>
      <!-- 性别 姓名 -->
      <div class="profile">
        <div class="grounding">
          <span class="iconfont iconxingbienan" v-if="personal.gender == 1"></span>
          <span class="iconfont iconxingbienv" v-if="personal.gender == 0"></span>
          <span>{{personal.nickname}}</span>
        </div>

        <!-- 日期  -->
        <p>{{moment(personal.create_date).format("YYYY-MM-DD") }}</p>
      </div>
      <!-- 图标 -->
      <span class="iconfont iconjiantou1"></span>
    </div>
    <!-- 列表栏 -->
    <!-- 遍历列表数据,使每一项的值都传入自定义属性中渲染到页面 -->
    <!-- 需要key,否则会报错 -->
    <!-- 把值传入label/tips属性中   ** 但是属性要在子组件中声明起来 ** -->
    <Listbar v-for="(item,index) in rows" :key="index" :aaa="item.label" :bbb="item.tips" />
    <Listbar aaa="退出" @click.native="heableClick" />
  </div>
</template>

<script>
// 导入列表组件
import Listbar from "@/components/Listbar";
import moment from "moment";
export default {
  data() {
    return {
      // 列表的数据
      rows: [
        { label: "我的关注", tips: "关注的用户" },
        { label: "我的跟帖", tips: "跟帖回复" },
        { label: "我的收藏", tips: "文章视频" }
      ],
      // 用来存储,缓存中的个人信息
      personal: {},
      // 日期插件中的moment,为了可以使用 需要绑定在data
      moment
    };
  },
  //mounted: 组件加载完毕后触发  类似window.onload
  mounted() {
    // 获取内存中的数据--获取到的是字符串类型userInfo
    const userJSON = localStorage.getItem("userInfo");
    //把字符串转为对象类型
    const userStr = JSON.parse(userJSON);
    console.log(userStr);

    // 拿到id 和 token  发送请求,获取值来渲染
    this.$axios({
      url: "/user/" + userStr.user.id,
      headers: {
        Authorization: userStr.token
      }
      // 获取成功后的,需要执行的函数 res:成功后返回的数据
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.personal = data;
    });
  },
  methods: {
    heableClick() {
      this.$dialog
        .confirm({
          title: "标题",
          message: "确定退出吗"
        })
        .then(() => {
          localStorage.removeItem('userInfo');
          this.$router.replace('/login')
        })
        .catch(() => {
          // 若是点击取消按钮 就什么都不做
        });
    }
  },
  components: {
    Listbar
  }
};
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
.header {
  display: flex;
  padding: 20 / @px;
  justify-content: space-between; //贴边对齐
  align-items: center; //上下居中对齐
  border-bottom: 3px #eee solid;
  .avatar {
    img {
      width: 70 / @px;
      height: 70 / @px;
      background-color: red;
      border-radius: 50%;
      object-fit: contain; //让图片显示正常
    }
  }
  .profile {
    font-size: 16 / @px;
    flex: 1;
    padding-left: 20 / @px;
    line-height: 1.5; //撑开一点间隙
    .iconxingbienan {
      color: #75b9eb;
    }
    .iconxingbienv {
      color: hotpink;
    }
    p {
      color: #999;
    }
  }
}
</style>