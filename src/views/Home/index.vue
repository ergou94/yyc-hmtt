<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button type="info" round icon="search" class="search-btn"
         to='/search' >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in MyChannel" :key="item.id">
        <MyHomeList :id="item.id"></MyHomeList>
      </van-tab>
      <template #nav-right>
        <div class="add" @click="isChannelPanelshow = true">
          <i class="toutiao toutiao-gengduo"> </i>
        </div>
        <div class="add1"></div>
        <van-popup
          v-model="isChannelPanelshow"
          position="bottom"
          :style="{ height: '90%', paddingTop: '1.5rem' }"
          closeable
          close-icon-position="top-left"
          ><ChannelPanel
            :MyChannel="MyChannel"
            :active="active"
            @login-active="(active = $event), (isChannelPanelshow = false)"
            @del-event="active = $event"
          ></ChannelPanel>
        </van-popup>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import MyHomeList from '@/components/MyHomeList.vue'
import ChannelPanel from '@/views/Home/components/ChannelPanel.vue'
import { getMyChannel } from '@/api/home'
import { getItem } from '@/utils/storage'
const MY_CHANNEL = 'MYCHANNEL'
export default {

  name: 'Home',
  created () {
    this.getMyChannelList()
  },
  data () {
    return {
      active: 0,
      MyChannel: [],
      isChannelPanelshow: false
    }
  },
  methods: {
    async getMyChannelList () {
      const channel = getItem(MY_CHANNEL)
      if (!(this.$store.state.user && this.$store.state.user.token) && channel) {
        this.MyChannel = channel
        console.log(this.MyChannel)
      } else {
        try {
          const res = await getMyChannel()
          this.MyChannel = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},
  watch: {
  },
  filters: {},
  components: {
    MyHomeList,
    ChannelPanel
  }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/.van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 0.01333rem solid #edeff3;
}
/deep/.van-tabs__line {
  width: 0.41333rem;
  height: 0.08rem;
  background: #3296fa;
}
.add {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.7);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
    color: #333333;
  }
}
.add1 {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.7);
}
/deep/.van-tabs__wrap {
  width: 100%;
  margin-top: 92px;
  position: fixed;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/.van-pull-refresh {
  height: calc(100vh - 105px);
  overflow: auto;
}
</style>
