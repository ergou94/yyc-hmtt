<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @cancel="$router.back()"
        @search="onSearch"
        autofocus
        @focus="issearch = false"
      />
    </form>
    <Searchhistory
      v-if="searchText === ''"
      @on-history="onSearch"
    ></Searchhistory>
    <template v-else>
      <SearchResult
        v-if="issearch === true"
        :searchText="searchText"
      ></SearchResult>
      <SearchSuggest
        v-else
        :searchText="searchText"
        @on-search="onSearch"
      ></SearchSuggest>
    </template>
  </div>
</template>

<script>
import Searchhistory from './components/searchHistory'
import SearchResult from './components/searchResult'
import SearchSuggest from './components/searchSuggest.vue'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      issearch: false
    }
  },
  methods: {
    onSearch (str) {
      this.searchText = str
      this.issearch = true
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    Searchhistory,
    SearchResult,
    SearchSuggest
  }
}
</script>

<style scoped lang='less'>
</style>
