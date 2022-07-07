<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复"></van-cell>
    <CommentItem
      :item="item"
      v-for="item in commentList"
      :key="item.com_id"
    ></CommentItem>
    <div class="comment-bottom"></div>
    <div class="button">
      <van-button
        type="primary"
        size="large"
        round
        block
        plain
        @click="addCommentShow = true"
        >评论</van-button
      >
    </div>
    <van-popup v-model="addCommentShow" position="bottom">
      <AddComment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        @add-comment="
          commentList.unshift($event);
          addCommentShow = false;
          comment.reply_count++;
        "
        v-if="addCommentShow"
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getComment } from '@/api/article'
import AddComment from './AddComment.vue'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      offset: null,
      limit: 99999999,
      commentList: [],
      addCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getComment({ type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit })
        this.commentList = res.data.data.results
      } catch (err) { console.log(err) }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (this.comment.reply_count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: {
    CommentItem,
    AddComment
  }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.button {
  height: 110px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: pink;
  width: 750px;
}
.comment-bottom {
  margin-bottom: 110px;
}
</style>
