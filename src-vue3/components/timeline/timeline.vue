<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>

<script>
import * as Vue from 'vue'
const prefixCls = 'ivu-timeline'

export default {
  name: 'Timeline',
  props: {
    pending: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-pending`]: this.pending,
        },
      ]
    },
  },
}
</script>
