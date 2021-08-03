<template>
  <div :class="anchorLinkClasses">
    <a
      :class="linkTitleClasses"
      :href="href"
      :data-scroll-offset="scrollOffset"
      :data-href="href"
      @click.prevent="goAnchor"
      :title="title"
      >{{ title }}</a
    >
    <slot></slot>
  </div>
</template>

<script>
import { $on, $off, $once, $emit } from '../../utils/gogocodeTransfer'
export default {
  name: 'AnchorLink',
  inject: ['anchorCom'],
  props: {
    href: String,
    title: String,
    scrollOffset: {
      type: Number,
    },
  },
  data() {
    return {
      scrollOffset: this.scrollOffset || this.anchorCom.scrollOffset,
      prefix: 'ivu-anchor-link',
    }
  },
  computed: {
    anchorLinkClasses() {
      return [
        this.prefix,
        this.anchorCom.currentLink === this.href ? `${this.prefix}-active` : '',
      ]
    },
    linkTitleClasses() {
      return [`${this.prefix}-title`]
    },
  },
  methods: {
    goAnchor() {
      this.currentLink = this.href
      this.anchorCom.handleHashChange()
      this.anchorCom.handleScrollTo()
      $emit(this.anchorCom, 'on-select', this.href)
      const isRoute = this.$router
      if (isRoute) {
        this.$router.push(this.href, () => {})
      } else {
        window.location.href = this.href
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.anchorCom.init()
    })
  },
  emits: ['on-select'],
}
</script>
