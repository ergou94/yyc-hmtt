<template>
  <div>
    <!-- 登录 -->
    <div class="header hear_login" v-if="user && user.token">
      <div class="avater">
        <div class="left">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button" @click="$router.push('/user')">编辑资料</div>
      </div>
      <div>
        <ul class="list">
          <li>
            <p>{{ userInfo.art_count }}</p>
            <p>头条</p>
          </li>
          <li>
            <p>{{ userInfo.follow_count }}</p>
            <p>关注</p>
          </li>
          <li>
            <p>{{ userInfo.fans_count }}</p>
            <p>粉丝</p>
          </li>
          <li>
            <p>{{ userInfo.like_count }}</p>
            <p>获赞</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header header_out" v-else>
      <div class="my_icon">
        <img class="moble" src="@/assets/banner/mobile.png" alt="" />
        <p>
          <a href="#/login">登录</a>/
          <a href="">注册</a>
        </p>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item icon="star-o" text="收藏" class="coll" />
      <van-grid-item icon="underway-o" text="历史" class="history" />
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>

    <van-button
      @click="loginout"
      type="default"
      block
      class="logout"
      v-if="user && user.token"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.data
      } catch (err) { console.log(err) }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async loginout () {
      try {
        await this.$dialog.confirm({
          message: '确认退出吗'
        })
        this.$store.commit('SetUser', {})
      } catch (err) { console.log(err) }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
body {
  background-color: #f5f7f9;
}
.header {
  position: relative;
  width: 750px;
  height: 401px;
  background: url("@/assets/banner/banner.png") rgb(50, 150, 250, 0.7);
  background-size: cover;
}
.header_out {
  .my_icon {
    position: absolute;
    width: 132px;
    height: 132px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    border-radius: 50%;
    color: #ffffff;
    .moble {
      width: 132px;
      height: 132px;
    }
    p {
      margin: 0;
      font-size: 28px;
      a {
        color: #ffffff;
      }
    }
  }
}
.hear_login {
  .avater {
    padding-top: 116px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 32px;
    padding-right: 33px;
    margin-bottom: 55px;
    .button {
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      letter-spacing: 1px;
      color: #666666;
      text-align: center;
      line-height: 33px;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        font-weight: normal;
        color: #ffffff;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.coll {
  color: #eb5253 !important;
}
.history {
  color: #ff9d1d !important;
}
.van-cell {
  font-size: 30px;
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #d86262;
}
.header_out .my_icon p {
  margin-top: 15px;
  font-size: 27px;
}
</style>
