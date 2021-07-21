<template>
  <div
    :class="[prefixCls + '-saturation-wrapper']"
    tabindex="0"
    @keydown.esc="handleEscape"
    @click="$el.focus()"
    @keydown.left="handleLeft"
    @keydown.right="handleRight"
    @keydown.up="handleUp"
    @keydown.down="handleDown"
  >
    <div
      ref="container"
      :style="bgColorStyle"
      :class="[prefixCls + '-saturation']"
      @mousedown="handleMouseDown"
    >
      <div :class="[prefixCls + '-saturation--white']"></div>
      <div :class="[prefixCls + '-saturation--black']"></div>
      <div :style="pointerStyle" :class="[prefixCls + '-saturation-pointer']">
        <div :class="[prefixCls + '-saturation-circle']"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HSAMixin from './hsaMixin'
import Prefixes from './prefixMixin'
import { clamp, getIncrement } from './utils'
import { on, off } from '../../utils/dom'

export default {
  name: 'Saturation',
  mixins: [HSAMixin, Prefixes],
  data() {
    const normalStep = 0.01

    return {
      left: -normalStep,
      right: normalStep,
      up: normalStep,
      down: -normalStep,
      multiplier: 10,
      powerKey: 'shiftKey',
    }
  },
  computed: {
    bgColorStyle() {
      return { background: `hsl(${this.modelValue.hsv.h}, 100%, 50%)` }
    },
    pointerStyle() {
      return {
        top: `${-(this.modelValue.hsv.v * 100) + 1 + 100}%`,
        left: `${this.modelValue.hsv.s * 100}%`,
      }
    },
  },
  methods: {
    change(h, s, v, a) {
      this.$emit('change', { h, s, v, a, source: 'hsva' })
    },
    handleSlide(e, direction, key) {
      e.preventDefault()
      e.stopPropagation()

      const isPowerKey = e[this.powerKey]
      const increment = isPowerKey ? direction * this.multiplier : direction
      const { h, s, v, a } = this.modelValue.hsv
      const saturation = clamp(
        s + getIncrement(key, ['left', 'right'], increment),
        0,
        1
      )
      const bright = clamp(
        v + getIncrement(key, ['up', 'down'], increment),
        0,
        1
      )

      this.change(h, saturation, bright, a)
    },
    handleChange(e) {
      e.preventDefault()
      e.stopPropagation()

      const { clientWidth, clientHeight } = this.$refs.container
      const left = clamp(this.getLeft(e), 0, clientWidth)
      const top = clamp(this.getTop(e), 0, clientHeight)
      const saturation = left / clientWidth
      const bright = clamp(1 - top / clientHeight, 0, 1)

      this.change(this.modelValue.hsv.h, saturation, bright, this.modelValue.hsv.a)
    },
    handleMouseDown(e) {
      HSAMixin.methods.handleMouseDown.call(this, e)
      //            window.addEventListener('mouseup', this.handleChange, false);
      on(window, 'mouseup', this.handleChange)
    },
    unbindEventListeners(e) {
      HSAMixin.methods.unbindEventListeners.call(this, e)
      //            window.removeEventListener('mouseup', this.handleChange);
      off(window, 'mouseup', this.handleChange)
    },
  },
  emits: ['change'],
}
</script>
