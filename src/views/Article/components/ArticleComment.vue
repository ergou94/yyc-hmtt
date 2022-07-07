<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="item in commentList"
        :key="item.com_id"
        :item="item"
        @replay-show="$emit('replay-show',$event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/article'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    source: {
      type: [Number, String],
      required: true
    },
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['a', 'c'].includes(value)// 数据只能是a或者c才能通过验证
      }
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsobj: {
        source: this.source,
        type: this.type,
        limit: 5,
        offset: null
      },

      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getComment(this.paramsobj)
        console.log('res', res)
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        this.commentList.push(...res.data.data.results)
        this.paramsobj.offset = res.data.data.last_id
        this.$emit('set-count', res.data.data.total_count)
        this.loading = false
      } catch (err) { console.log(err) }
    },
    onLoad () {
      this.getCommentList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    CommentItem
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
