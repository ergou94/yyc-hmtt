<template>
  <van-cell>
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d" slot="title">hello</span>
    <div slot="label">
      <p style="color: #363636">{{ item.content }}</p>
      <p>
        <span style="margin-right: 10px">{{ item.pubdate | dataformate }}</span>
        <van-button
          size="mini"
          type="default"
          @click="$emit('replay-show', item)"
          >回复</van-button
        >
      </p>
    </div>
    <van-loading color="#1989fa" v-if="isloading" size="24" />
    <van-icon
      v-else
      @click="onclick"
      slot="right-icon"
      :name="item.is_liking ? 'like' : 'good-job-o'"
      :color="item.is_liking ? 'red' : ''"
      >{{ item.like_count > 0 ? item.like_count : "赞" }}</van-icon
    >
  </van-cell>
</template>

<script>
import { addLike, delLike } from '@/api/article'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isloading: false
    }
  },
  methods: {

    async onclick () {
      this.isloading = true
      if (this.item.is_liking) {
        try {
          await delLike(this.item.com_id)
          this.item.like_count--
          this.item.is_liking = false
        } catch (err) { console.log(err) }
      } else {
        try {
          await addLike(this.item.com_id)
          this.item.is_liking = true
          this.item.like_count++
        } catch (err) { console.log(err) }
      }
      this.isloading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.vant-icon {
  width: 28px;
}
</style>
