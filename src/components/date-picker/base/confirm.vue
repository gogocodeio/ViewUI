<template>
  <div :class="[prefixCls + '-confirm']" @keydown.tab.capture="handleTab">
    <i-button
      :class="timeClasses"
      size="small"
      type="text"
      :disabled="timeDisabled"
      v-if="showTime"
      @click="handleToggleTime"
    >
      {{ labels.time }}
    </i-button>
    <i-button size="small" @click="handleClear" @keydown.enter="handleClear">
      {{ labels.clear }}
    </i-button>
    <i-button
      size="small"
      type="primary"
      @click="handleSuccess"
      @keydown.enter="handleSuccess"
    >
      {{ labels.ok }}
    </i-button>
  </div>
</template>

<script>
import { $on, $off, $once, $emit } from '../../../utils/gogocodeTransfer'
import iButton from '../../button/button.vue'
import Locale from '../../../mixins/locale'
import Emitter from '../../../mixins/emitter'

const prefixCls = 'ivu-picker'

export default {
  mixins: [Locale, Emitter],
  components: { iButton },
  props: {
    showTime: false,
    isTime: false,
    timeDisabled: false,
  },
  data() {
    return {
      prefixCls: prefixCls,
    }
  },
  computed: {
    timeClasses() {
      return `${prefixCls}-confirm-time`
    },
    labels() {
      const labels = ['time', 'clear', 'ok']
      const values = [this.isTime ? 'selectDate' : 'selectTime', 'clear', 'ok']
      return labels.reduce((obj, key, i) => {
        obj[key] = this.t('i.datepicker.' + values[i])
        return obj
      }, {})
    },
  },
  methods: {
    handleClear() {
      $emit(this, 'on-pick-clear')
    },
    handleSuccess() {
      $emit(this, 'on-pick-success')
    },
    handleToggleTime() {
      if (this.timeDisabled) return
      $emit(this, 'on-pick-toggle-time')
      this.dispatch('CalendarPicker', 'focus-input')
      this.dispatch('CalendarPicker', 'update-popper')
    },
    handleTab(e) {
      const tabbables = [...this.$el.children]
      const expectedFocus = tabbables[e.shiftKey ? 'shift' : 'pop']()

      if (document.activeElement === expectedFocus) {
        e.preventDefault()
        e.stopPropagation()
        this.dispatch('CalendarPicker', 'focus-input')
      }
    },
  },
  emits: ['on-pick-clear', 'on-pick-success', 'on-pick-toggle-time'],
}
</script>
