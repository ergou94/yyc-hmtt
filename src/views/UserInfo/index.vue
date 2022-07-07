<template>
  <div>
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <van-cell title="头像" is-link @click="showInput">
      <van-image
        width=".9rem"
        height=".9rem"
        round
        fit="cover"
        :src="profile.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      @click="isNameshow = true"
      :value="profile.name"
    >
    </van-cell>
    <van-cell
      title="性别"
      is-link
      @click="isSexShow = true"
      :value="profile.gender === 0 ? '男' : '女'"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      @click="isBirthDayShow = true"
      :value="profile.birthday"
    >
    </van-cell>
    <!-- 昵称 -->
    <van-popup
      v-model="isNameshow"
      position="bottom"
      :style="{ height: '1000%' }"
    >
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="isNameshow = false"
        @click-right="onClickRight"
      />
      <van-field
        :value="profile.name"
        @input="name = $event"
        rows="1"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入姓名"
      />
    </van-popup>
    <!-- 生日 -->
    <van-popup v-model="isBirthDayShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
    <van-popup v-model="isSexShow" position="bottom">
      <van-picker
        title="性别"
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm1"
      />
    </van-popup>
    <input
      type="file"
      style="display: none"
      accept="image/png,image/jpeg,image/gif,image/jpg"
      ref="file"
      @change="onChange"
    />
    <van-popup v-model="isUpdateAvutar" position="bottom" style="height: 100%">
      <UpdateAvatar
        :img-src.sync="imgSrc"
        @close="isUpdateAvutar = false"
      ></UpdateAvatar
    ></van-popup>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/api/user'
import UpdateAvatar from './components/UpdateAvatar.vue'
export default {
  created () {
    this.getUserProfile()
  },
  data () {
    return {
      profile: {},
      isNameshow: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 12, 31),
      name: '',
      isBirthDayShow: false,
      birthday1: '',
      isSexShow: false,
      columns: ['男', '女'],
      isUpdateAvutar: false,
      imgSrc: ''

    }
  },
  methods: {
    onChange () {
      const url = window.URL.createObjectURL(this.$refs.file.files[0])
      console.log(url)
      this.imgSrc = url
      this.isUpdateAvutar = true
    },
    showInput () {
      this.$refs.file.click()
    },
    async getUserProfile () {
      try {
        const res = await getUserProfile()
        this.profile = res.data.data
        console.log(this.profile)
      } catch (err) {
        console.log(err)
      }
    },
    async onClickRight () {
      this.profile.name = this.name
      await this.updateUserProfile()
      this.isNameshow = false
    },
    async updateUserProfile () {
      try {
        const res = await updateUserProfile(this.profile)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    onConfirm1 (value, index) {
      this.profile.gender = index
      this.updateUserProfile()
      this.isSexShow = false
    },
    onConfirm () {
      this.profile.birthday = this.birthday1
      this.updateUserProfile()
      this.isBirthDayShow = false
    },
    onCancel () {
      this.isBirthDayShow = false
      this.isSexShow = false
    }

  },
  computed: {
    currentDate: {
      get () {
        return new Date(this.profile.birthday)
      },
      set (newVal) {
        this.birthday1 = newVal.getFullYear() + ' - ' + (newVal.getMonth() + 1) + '-' + newVal.getDate()
      }
    }
  },
  watch: {},
  filters: {},
  components: {
    UpdateAvatar
  }
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar__text {
  color: #fff;
}
</style>
