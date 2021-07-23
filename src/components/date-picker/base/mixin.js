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
      const { selectionMode, modelValue, rangeState } = this
      const rangeSelecting = selectionMode === 'range' && rangeState.selecting
      return rangeSelecting ? [rangeState.from] : modelValue
    },
  },
  methods: {
    handleClick(cell, e) {
      e.stopPropagation()

      if (cell.disabled || cell.type === 'weekLabel') return
      const newDate = new Date(clearHours(cell.date))

      this.$emit('on-pick', newDate)
      this.$emit('on-pick-click')
    },
    handleMouseMove(cell) {
      if (!this.rangeState.selecting) return
      if (cell.disabled) return
      const newDate = cell.date
      this.$emit('on-change-range', newDate)
    },
  },
}
