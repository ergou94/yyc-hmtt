<template>
  <div>
    <van-cell title="搜索历史">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template v-if="idDelete">
        <span @click="$store.commit('delAllHistory')">全部删除/</span>
        <span @click="idDelete = false">完成</span>
      </template>
      <template v-else>
        <van-icon @click="idDelete = true" name="delete" />
      </template>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistoryList"
      :key="index"
      @click="$emit('on-history', item)"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template>
        <van-icon
          name="close"
          v-if="idDelete"
          @click.stop="$store.commit('delHistory', index)"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () { },
  data () {
    return {
      idDelete: false
    }
  },
  methods: {},
  computed: {
    ...mapState(['searchHistoryList'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
