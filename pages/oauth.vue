<template>
  <section class="container">
    <img src="../static/img/logo.png" alt="Nuxt.js Logo" class="logo" />
  </section>
</template>
<script>
import { mapState } from 'vuex'

export default {
  asyncData({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  head() {
    return {
      title: `测试页面`
    }
  },
  computed: {
    ...mapState([
      'baseUrl'
    ])
  },
  beforeMount() {
    const url = window.location.href

    this.$store.dispatch('getWechatOAuth', url)
      .then(res => {
        const { data } = res
        console.log('datares', data)
        if (data.success) {
          // this.$store.dispatch('setAuthUser', data.user)
          // const visit = '/' + getUrlParam('state')
          // this.$router.replace(visit)
        } else {
          throw new Error('用户信息获取失败')
        }
      })
  }
}
</script>

<style scoped>
.title
{
  margin-top: 50px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 50px;
}
</style>
