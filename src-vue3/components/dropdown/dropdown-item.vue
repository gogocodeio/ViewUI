<template>
  <li :class="classes" @click="handleClick"><slot></slot></li>
</template>

<script>
import tiny_emitter from 'tiny-emitter/instance'
const prefixCls = 'ivu-dropdown-item'
import { findComponentUpward } from '../../utils/assist'
const tiny_emitter_override = {
  $on: (...args) => tiny_emitter.on(...args),
  $once: (...args) => tiny_emitter.once(...args),
  $off: (...args) => tiny_emitter.off(...args),
  $emit: (...args) => tiny_emitter.emit(...args),
}
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
      Object.assign($parent, tiny_emitter_override)
      const hasChildren =
        this.$parent && this.$parent.$options.name === 'Dropdown'

      if (hasChildren) {
        Object.assign(this.$parent, tiny_emitter_override)
        this.$parent.$emit('on-haschild-click')
      } else {
        if ($parent && $parent.$options.name === 'Dropdown') {
          $parent.$emit('on-hover-click')
        }
      }
      $parent.$emit('on-click', this.name)
    },
  },
  emits: ['on-click', 'on-haschild-click', 'on-hover-click'],
}
</script>
