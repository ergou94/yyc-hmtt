<template>
  <div>
    <van-nav-bar title="登录" @click-left='$router.back()'>
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="sb">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '手机号码格式不正确',
          },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度必须是6位  ' },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down
            v-if="istime"
            :time="time"
            format="ss s"
            @finish="istime = false"
          />
          <van-button
            @click="onSendSms"
            v-else
            class="yzm"
            size="small"
            round
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          class="login-btn"
          round
          block
          type="info"
          native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111',
      code: '246810',
      time: 60 * 1000,
      istime: false

    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        this.$store.commit('SetUser', res.data.data)
        this.$toast.success('登陆成功')
        this.$router.push('my')
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    },
    async onSendSms () {
      try {
        await this.$refs.sb.validate('mobile')
        this.istime = true
        try {
          await getSmsCode(this.mobile)
        } catch (err) {
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        console.log(err)
        console.log('效验失败')
        this.$toast.fail('手机号码不正确')
      }
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  position: fixed;
  right: 10px;
  color: #666666;
  font-size: 22px;
  background-color: #ededed;
  width: 152px;
  line-height: 36px;
  height: 46px;
  .van-button__text {
    zoom: 0.9;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  font-size: 30px;
  color: #ffffff;
}
</style>
