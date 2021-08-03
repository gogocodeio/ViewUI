<template>
  <div class="ivu-cell-group">
    <slot></slot>
  </div>
</template>

<script>
import { $on, $off, $once, $emit } from '../../utils/gogocodeTransfer'
export default {
  name: 'CellGroup',
  provide() {
    return {
      cellGroup: this,
    }
  },
  methods: {
    handleClick(name) {
      $emit(this, 'on-click', name)
    },
  },
  emits: ['on-click'],
}
</script>
