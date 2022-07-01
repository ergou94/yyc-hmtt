<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group>
          <!-- <van-cell
            :title="item.title"
            value="内容"
            :label="item.aut_name"
            v-for="(item, index) in articleList"
            :key="index"
          /> -->
          <ArticleItem v-for="(item, index) in articleList"
            :key="index" :article='item'></ArticleItem>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { ArticleList } from '@/api/home'
import ArticleItem from './ArticleItem'
let ele = null
let scrollTop = 0
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  mounted () { // 绑定滚动事件，给pullRefresh滚动条绑定滚动事件，让scrollTop这个变量等于当前的scrollTop值
    ele = this.$refs.pullRefresh.$el
    this.$refs.pullRefresh.$el.addEventListener('scroll', function () {
      scrollTop = this.scrollTop
    })
  },
  activated () {
    // 让ele这个变量的scrollTop属性等于当前的这个变量值
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    onRefresh () {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.timestamp = Date.now()
      this.getArticleList()
    },
    onLoad () {
      this.getArticleList()
    },
    async getArticleList () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const res = await ArticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 180px;
}
</style>
