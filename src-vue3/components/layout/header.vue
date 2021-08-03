<template>
  <div :class="wrapClasses"><slot></slot></div>
</template>

<script>
import * as Vue from 'vue'
const prefixCls = 'ivu-layout'
export default {
  name: 'Header',
  computed: {
    wrapClasses() {
      return `${prefixCls}-header`
    },
  },
}
</script>
