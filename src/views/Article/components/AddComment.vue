<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    center
    ref="focus"
  >
    <template #extra>
      <van-button @click="onclick" :disabled="message === ''">发布</van-button>
    </template>
  </van-field>
</template>

<script>
import { addComment } from '@/api/article'
export default {
  name: 'addComment',
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    art_id: {
      tyep: [String, Number]
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onclick () {
      if (!(this.$store.state.user && this.$store.state.user.token)) {
        try {
          await this.$dialog.confirm({ message: '请登录' })
          this.$router.push('/login')
        } catch (err) { console.log(err) }
      } else {
        try {
          const res = await addComment({ target: this.target, content: this.message, art_id: this.art_id })
          console.log('res1', res)
          this.$emit('add-comment', res.data.data.new_obj)
        } catch (err) { console.log(err) }
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    // 组件最终会变成Dom结构,$el可以获取这个组建的根标签Dom
    this.$refs.focus.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.van-button {
  border: none;
  color: #31abfcee;
}
</style>
