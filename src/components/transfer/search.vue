<template>
  <div :class="prefixCls">
    <i-input
      v-model="currentQuery"
      size="small"
      :icon="icon"
      :placeholder="placeholder"
      @on-click="handleClick"
    ></i-input>
  </div>
</template>

<script>
import { $on, $off, $once, $emit } from '../../utils/gogocodeTransfer'
import iInput from '../input/input.vue'

export default {
  name: 'Search',
  components: { iInput },
  props: {
    prefixCls: String,
    placeholder: String,
    query: String,
  },
  data() {
    return {
      currentQuery: this.query,
    }
  },
  watch: {
    query(val) {
      this.currentQuery = val
    },
    currentQuery(val) {
      $emit(this, 'on-query-change', val)
    },
  },
  computed: {
    icon() {
      return this.query === '' ? 'ios-search' : 'ios-close-circle'
    },
  },
  methods: {
    handleClick() {
      if (this.currentQuery === '') return
      this.currentQuery = ''
      $emit(this, 'on-query-clear')
    },
  },
  emits: ['on-query-change', 'on-query-clear'],
}
</script>
