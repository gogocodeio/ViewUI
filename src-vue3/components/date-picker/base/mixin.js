import { $on, $off, $once, $emit } from '../../../utils/gogocodeTransfer'
import * as Vue from 'vue'
import { clearHours } from '../util'

export default {
  name: 'PanelTable',
  props: {
    tableDate: {
      type: Date,
      required: true,
    },
    disabledDate: {
      type: Function,
    },
    selectionMode: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
    rangeState: {
      type: Object,
      default: () => ({
        from: null,
        to: null,
        selecting: false,
      }),
    },
    focusedDate: {
      type: Date,
      required: true,
    },
  },
  computed: {
    dates() {
      const { modelValue: value, selectionMode, rangeState } = this
      const rangeSelecting = selectionMode === 'range' && rangeState.selecting
      return rangeSelecting ? [rangeState.from] : value
    },
  },
  methods: {
    handleClick(cell, e) {
      e.stopPropagation()

      if (cell.disabled || cell.type === 'weekLabel') return
      const newDate = new Date(clearHours(cell.date))

      $emit(this, 'on-pick', newDate)
      $emit(this, 'on-pick-click')
    },
    handleMouseMove(cell) {
      if (!this.rangeState.selecting) return
      if (cell.disabled) return
      const newDate = cell.date
      $emit(this, 'on-change-range', newDate)
    },
  },
  emits: ['on-pick', 'on-change-range', 'on-pick-click'],
}
