<template>
  <van-loading color="#1989fa" v-if="isLoading" size=".53333rem" />
  <van-icon
    v-else
    :color="is_collected ? 'red' : '#777'"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onclick"
  />
</template>

<script>
import { addCollect, endCollect } from '@/api/article'
export default {
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }
  },
  name: 'CollectActive',
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onclick () {
      const target = this.$route.params.article_id
      if (!(this.$store.state.user && this.$store.state.user.token)) {
        try {
          await this.$dialog.confirm({ message: '请登录' })
          this.$router.push('/login')
        } catch (err) { console.log(err) }
      } else {
        this.isLoading = true
        if (this.is_collected) {
          try {
            await endCollect(target)
            this.$emit('update:is_collected', !this.is_collected)
          } catch (e) { console.log(e) }
        } else {
          try {
            await addCollect(target)
            this.$emit('update:is_collected', !this.is_collected)
          } catch (e) { console.log(e) }
        }
        this.isLoading = false
      }
    }
    // this.$emit('update:is_collected', !this.is_collected)
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
