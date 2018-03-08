<template lang="pug">
.container
  .focusHouse-media
    img(v-if='house.cname' :src="imageCDN + house.cname + '.jpg?imageView2/1/w/750/h/460/format/jpg/q/90|imageslim'")
    .focusHouse-text
      .words {{ house.words }}
      .name {{ house.name }}

  .focusHouse-body
    .focusHouse-item-title {{ house.cname }}
    .focusHouse-item-body {{ house.intro }}

    .focusHouse-item-title 主要角色
    .focusHouse-item-body(v-for='(item, index) in house.swornMembers' :key='index' v-if="item.character")
      .swornMembers
        img(:src="imageCDN + item.character.profile + '?imageView2/1/w/280/h/340/format/jpg/q/75|imageslim'")
        .swornMembers-body
          .name {{ item.character.cname }}
          .introduction {{ item.text }}

    .focusHouse-item-section(v-for='(item, i) in house.sections' )
      .focusHouse-item-title {{ item.title }}
      .focusHouse-item-body(v-for='text in item.content') {{ text }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: '家族详情'
    }
  },
  computed: {
    ...mapState({
      imageCDN: 'imageCDN',
      house: 'focusHouse'
    })
  },
  beforeCreate() {
    let id = this.$route.query.id
    this.$store.dispatch('focusHouse', id)
  }
}
</script>

<style scoped lang="sass" src='../../static/sass/house.sass'></style>
