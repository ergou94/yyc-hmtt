<template>
  <div>
    <van-cell
      v-for="(item, index) in suggestList"
      :key="index"
      :title="item"
      icon="search"
      @clicl="$emit('on-search',item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      suggestList: []
    }
  },
  methods: {
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {

  },
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            console.log('res', res)
            this.suggestList = res.data.data.options
          } catch (err) {
            console.log(err)
          }
        }, 500)
      },
      immediate: true// 立即指向
    }

  },
  filters: {},
  components: {},
  beforeDestroy () {
    clearTimeout(timer)
  }
}
</script>

<style scoped lang='less'>
</style>
