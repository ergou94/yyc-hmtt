<template>
  <div>
    <div class="my">
      <div class="top">
        <h3>我的频道</h3>
        <van-button
          type="danger"
          round
          size="mini"
          plain
          @click="isShow = !isShow"
          >{{ isShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <div class="bottom">
        <van-row>
          <van-col
            span="6"
            size="small"
            v-for="(item, index) in MyChannel"
            :key="item.id"
          >
            <van-button
              @click="onclick(index)"
              type="primary"
              size="small"
              :style="{ color: active === index ? 'red' : '' }"
            >
              {{ item.name }}
              <van-icon
                v-show="isShow"
                name="close"
                v-if="index != 0"
                :style="{ color: active === index ? 'red' : '' }"
              />
            </van-button>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="my">
      <div class="top">
        <h3>频道推荐</h3>
      </div>
      <div class="bottom">
        <van-row>
          <van-col span="6" v-for="item in MyArticleList" :key="item.id">
            <van-button size="small" type="primary" @click="add(item.id)"
              >+{{ item.name }}</van-button
            >
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { AllArticleList, saveChannel } from '@/api/home'
import { setItem } from '@/utils/storage'
const MY_CHANNEL = 'MYCHANNEL'
export default {
  name: 'AllArticleList',
  props: {
    MyChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllArticleList()
  },
  data () {
    return {
      MyArticleList: [],
      isShow: false
    }
  },
  methods: {
    async getAllArticleList () {
      try {
        const res = await AllArticleList()
        console.log('res', res)
        this.MyArticleList = res.data.data.channels.filter(item => this.MyChannel.every(item1 => item1.id !== item.id))
      } catch (err) { console.log(err) }
    },
    add (id) {
      const index = this.MyArticleList.findIndex(item => item.id === id)
      // eslint-disable-next-line vue/no-mutating-props
      this.MyChannel.push(this.MyArticleList[index])
      this.MyArticleList.splice(index, 1)
    },
    onclick (index) {
      if (index === 0) return
      if (this.isShow) {
        // 删除
        const obj = this.MyChannel[index]
        // eslint-disable-next-line vue/no-mutating-props
        this.MyChannel.splice(index, 1)
        this.MyArticleList.push(obj)
        if (this.MyChannel.index === 0) {
          return this.MyChannel
        }

        if (this.active > index) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 跳转
        this.$emit('login-active', index)
      }
    }
  },
  computed: {},
  watch: {
    MyChannel: {
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) {
          console.log(123)
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
            console.log(arr)
          })
          try {
            await saveChannel(arr)
          } catch (err) {
            console.log(err)
          }
        } else {
          console.log(456)
          setItem(MY_CHANNEL, newVal)
        }
      }

    },
    deep: true
  },

  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.my {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: 32px;
      font-weight: normal;
      line-height: 36px;
      letter-spacing: 2px;
      color: #333333;
      margin-left: 24px;
    }
    .van-button {
      width: 103px;
      height: 48px;
      margin-right: 24px;
    }
  }
}
.van-row {
  margin: 48px 24px;
  .van-button {
    position: relative;
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
    color: #333;
    border: 0;
    margin: 15px 23px;
    .van-icon-close {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
