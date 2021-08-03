<template>
  <div :class="wrapClasses"><slot></slot></div>
</template>

<script>
import * as Vue from 'vue'
import { $children } from '../../utils/gogocodeTransfer'
const prefixCls = 'ivu-layout'

export default {
  name: 'Layout',
  data() {
    return {
      hasSider: false,
    }
  },
  computed: {
    wrapClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-has-sider`]: this.hasSider,
        },
      ]
    },
  },
  methods: {
    findSider() {
      return $children(this).some((child) => {
        return child.$options.name === 'Sider'
      })
    },
  },
  mounted() {
    this.hasSider = this.findSider()
  },
}
</script>
