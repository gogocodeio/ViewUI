<template>
  <li :class="classes" @click="handleClick"><slot></slot></li>
</template>

<script>
import { $on, $off, $once, $emit } from '../../utils/gogocodeTransfer'
import * as Vue from 'vue'
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
        $emit(this.$parent, 'on-haschild-click')
      } else {
        if ($parent && $parent.$options.name === 'Dropdown') {
          $emit($parent, 'on-hover-click')
        }
      }
      $emit($parent, 'on-click', this.name)
    },
  },
  emits: ['on-click', 'on-haschild-click', 'on-hover-click'],
}
</script>
