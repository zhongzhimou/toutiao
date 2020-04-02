<template>
  <div class="content">
    <NavigateBar title="我的关注" />
    <div class="profile" v-for="(item, index) in focus" :key="index">
      <img :src="$axios.defaults.baseURL + item.head_img" alt />
      <div class="theme">
        <div>{{item.nickname}}</div>
        <p>{{moment(item.create_date).format("YYYY-MM-DD")}}</p>
      </div>
      <span class="btn" @click="handleClick(item.id, index)">取消关注</span>
    </div>
    <div class="aaa" v-if="focus==''">你还没任何关注</div>
    <!-- <div class="profile">
      <img :src="focus.head_img" alt="">
    <div class="theme">
      <div>{{focus.nickname}}</div>
      <p>{{moment(focus.create_date).format("YYYY-MM-DD")}}</p>
    </div>
   <span class="btn" @click="handleClick(focus.id)">取消关注</span>
    </div>-->
  </div>
</template>

<script>
import NavigateBar from "@/components/NavigateBar";
import moment from "moment";
export default {
  data() {
    return {
      focus: {},
      // 时间插件
      moment,
      // 本地数据
      userFocus: {}
    };
  },
  mounted() {
    // 获取后台token数据
    const userFocus = JSON.parse(localStorage.getItem("userInfo"));
    // 存入data
    this.userFocus = userFocus;
    // 获取后台关注的数据
    this.$axios({
      url: "/user_follows",
      headers: {
        Authorization: userFocus.token
      }
    }).then(res => {
      // 关注的列表
      // console.log(res);

      // 把数据结构出来
      const { data } = res.data;

      this.focus = data;
      console.log(this.focus);
    });
  },
  methods: {
    handleClick(id, index) {
      // 在取消关注前加提示
      this.$dialog
        .confirm({
          title: "标题",
          message: "确定退出吗"
        })
        .then(() => {
          // 把要删除的关注id传入后台,实现删除
          this.$axios({
            url: "/user_unfollow/" + id,
            headers: {
              Authorization: this.userFocus.token
            }
          }).then(res => {
            // 取消关注成功
            console.log(res);
            this.$toast.success("取消关注成功");
            // 刷新页面有两种方法
            // 方法一
            this.focus.splice(index, 1);
            // 方法二 再次进行请求接口 + 存值
          });
        });
    }
  },
  components: {
    NavigateBar
  }
};
</script>

<style scoped lang='less'>
@px: 360 /100vw;
.profile {
  display: flex;
  padding: 20 / @px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #eee solid;
  img {
    width: 40 / @px;
    height: 40 / @px;
    display: block;
    object-fit: cover;
    border-radius: 50%;
  }

  .theme {
    flex: 1;
    padding-left: 15 / @px;
    p {
      font-size: 14 / @px;
      color: #999;
    }
  }
  .btn {
    padding: 3px 10px;
    border-radius: 20 / @px;
    background: #eee;
    font-size: 14 / @px;
  }
}
.aaa{
  padding: 100px;
}
</style>