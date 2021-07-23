<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'ivu-breadcrumb'
import {  $children } from '../../utils/assist'

export default {
  name: 'Breadcrumb',
  props: {
    separator: {
      type: String,
      default: '/',
    },
  },
  computed: {
    classes() {
      return `${prefixCls}`
    },
  },
  mounted() {
    this.updateChildren()
  },
  updated() {
    this.$nextTick(() => {
      this.updateChildren()
    })
  },
  methods: {
    updateChildren() {
      $children(this).forEach((child) => {
        child.separator = this.separator
      })
    },
  },
  watch: {
    separator() {
      this.updateChildren()
    },
  },
}
</script>
