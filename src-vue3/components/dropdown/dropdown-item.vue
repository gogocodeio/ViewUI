<template>
  <li :class="classes" @click="handleClick"><slot></slot></li>
</template>

<script>
import tiny_emitter from 'tiny-emitter/instance'
const prefixCls = 'ivu-dropdown-item'
import { findComponentUpward } from '../../utils/assist'
export default {
  name: 'DropdownItem',
  props: {
    name: {
      type: [String, Number],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    divided: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-selected`]: this.selected,
          [`${prefixCls}-divided`]: this.divided,
        },
      ]
    },
  },
  methods: {
    handleClick() {
      if (this.disabled) return
      const $parent = findComponentUpward(this, 'Dropdown')
      const hasChildren =
        this.$parent && this.$parent.$options.name === 'Dropdown'

      if (hasChildren) {
        tiny_emitter.emit('on-haschild-click')
      } else {
        if ($parent && $parent.$options.name === 'Dropdown') {
          tiny_emitter.emit('on-hover-click')
        }
      }
      tiny_emitter.emit('on-click', this.name)
    },
  },
  emits: ['on-click', 'on-haschild-click', 'on-hover-click'],
}
</script>
