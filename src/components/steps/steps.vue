<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf } from '../../utils/assist'
import Bus from '../../mixins/bus'

const prefixCls = 'ivu-steps'

function debounce(fn) {
  let waiting
  return function () {
    if (waiting) return
    waiting = true
    const context = this,
      args = arguments
    const later = function () {
      waiting = false
      fn.apply(context, args)
    }
    this.$nextTick(later)
  }
}

export default {
  name: 'Steps',
  mixins: [Bus],
  props: {
    current: {
      type: Number,
      default: 0,
    },
    status: {
      validator(value) {
        return oneOf(value, ['wait', 'process', 'finish', 'error'])
      },
      default: 'process',
    },
    size: {
      validator(value) {
        return oneOf(value, ['small'])
      },
    },
    direction: {
      validator(value) {
        return oneOf(value, ['horizontal', 'vertical'])
      },
      default: 'horizontal',
    },
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.direction}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
        },
      ]
    },
  },
  methods: {
    updateChildProps(isInit) {
      const total = this.vueChildren.length
      this.vueChildren.forEach((child, index) => {
        child.stepNumber = index + 1

        if (this.direction === 'horizontal') {
          child.total = total
        }

        // 如果已存在status,且在初始化时,则略过
        // todo 如果当前是error,在current改变时需要处理
        if (!(isInit && child.currentStatus)) {
          if (index === this.current) {
            if (this.status !== 'error') {
              child.currentStatus = 'process'
            }
          } else if (index < this.current) {
            child.currentStatus = 'finish'
          } else {
            child.currentStatus = 'wait'
          }
        }

        if (child.currentStatus !== 'error' && index !== 0) {
          this.vueChildren[index - 1].nextError = false
        }
      })
    },
    setNextError() {
      this.vueChildren.forEach((child, index) => {
        if (child.currentStatus === 'error' && index !== 0) {
          this.vueChildren[index - 1].nextError = true
        }
      })
    },
    updateCurrent(isInit) {
      // 防止溢出边界
      if (this.current < 0 || this.current >= this.vueChildren.length) {
        return
      }
      if (isInit) {
        const current_status = this.vueChildren[this.current].currentStatus
        if (!current_status) {
          this.vueChildren[this.current].currentStatus = this.status
        }
      } else {
        this.vueChildren[this.current].currentStatus = this.status
      }
    },
    debouncedAppendRemove() {
      return debounce(function () {
        this.updateSteps()
      })
    },
    updateSteps() {
      this.updateChildProps(true)
      this.setNextError()
      this.updateCurrent(true)
    },
  },
  mounted() {
    this.updateSteps()
    this.vueOn('append', this.debouncedAppendRemove())
    this.vueOn('remove', this.debouncedAppendRemove())
  },
  watch: {
    current() {
      this.updateChildProps()
    },
    status() {
      this.updateCurrent()
    },
  },
}
</script>
