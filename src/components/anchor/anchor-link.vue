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
import tiny_emitter from 'tiny-emitter/instance'
const tiny_emitter_override = {
  $on: (...args) => tiny_emitter.on(...args),
  $once: (...args) => tiny_emitter.once(...args),
  $off: (...args) => tiny_emitter.off(...args),
  $emit: (...args) => tiny_emitter.emit(...args),
}
export default {
  name: 'AnchorLink',
  inject: ['anchorCom'],
  props: {
    href: String,
    title: String,
    scrollOffset: {
      type: Number,
      default() {
        return this.anchorCom.scrollOffset
      },
    },
  },
  data() {
    return {
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
      Object.assign(this.anchorCom, tiny_emitter_override)
      this.anchorCom.$emit('on-select', this.href)
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
