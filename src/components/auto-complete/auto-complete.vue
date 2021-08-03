<template>
  <i-select
    ref="select"
    class="ivu-auto-complete"
    :label="label"
    :disabled="itemDisabled"
    :clearable="clearable"
    :placeholder="placeholder"
    :size="size"
    :placement="placement"
    :modelValue="currentValue"
    :transfer-class-name="transferClassName"
    filterable
    remote
    auto-complete
    :remote-method="remoteMethod"
    @on-select="handleSelect"
    @on-clickoutside="handleClickOutside"
    :transfer="transfer"
    :capture="capture"
    :eventsEnabled="eventsEnabled"
  >
    <slot name="input">
        <i-input
          :element-id="elementId"
          ref="input"
          v-model="currentValue"
          :name="name"
          :placeholder="placeholder"
          :disabled="itemDisabled"
          :size="size"
          :icon="inputIcon"
          @on-click="handleClear"
          @on-focus="handleFocus"
          @on-blur="handleBlur"
        ></i-input>
    </slot>
    <slot>
      <i-option v-for="item in filteredData" :modelValue="item" :key="item">{{
        item
      }}</i-option>
    </slot>
  </i-select>
</template>

<script>
import { $on, $off, $once, $emit } from '../../utils/gogocodeTransfer'
import iSelect from '../select/select.vue'
import iOption from '../select/option.vue'
import iInput from '../input/input.vue'
import { oneOf } from '../../utils/assist'
import Emitter from '../../mixins/emitter'
import mixinsForm from '../../mixins/form'

export default {
  name: 'AutoComplete',
  mixins: [Emitter, mixinsForm],
  components: { iSelect, iOption, iInput },
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: [String, Number],
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default() {
        return !window.$IVIEW || window.$IVIEW.size === ''
          ? 'default'
          : window.$IVIEW.size
      },
    },
    icon: {
      type: String,
    },
    filterMethod: {
      type: [Function, Boolean],
      default: false,
    },
    placement: {
      validator(value) {
        return oneOf(value, [
          'top',
          'bottom',
          'top-start',
          'bottom-start',
          'top-end',
          'bottom-end',
        ])
      },
      default: 'bottom-start',
    },
    transfer: {
      type: Boolean,
      default() {
        return !window.$IVIEW || window.$IVIEW.transfer === ''
          ? false
          : window.$IVIEW.transfer
      },
    },
    name: {
      type: String,
    },
    elementId: {
      type: String,
    },
    transferClassName: {
      type: String,
    },
    // 4.6.0
    capture: {
      type: Boolean,
      default() {
        return !window.$IVIEW ? true : window.$IVIEW.capture
      },
    },
    // 4.6.0
    eventsEnabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentValue: this.modelValue,
      disableEmitChange: false, // for Form reset
    }
  },
  computed: {
    inputIcon() {
      let icon = ''
      if (this.clearable && this.currentValue && !this.disabled) {
        icon = 'ios-close'
      } else if (this.icon) {
        icon = this.icon
      }
      return icon
    },
    filteredData() {
      if (this.filterMethod) {
        return this.data.filter((item) =>
          this.filterMethod(this.currentValue, item)
        )
      } else {
        return this.data
      }
    },
  },
  watch: {
    modelValue(val) {
      if (this.currentValue !== val) {
        this.disableEmitChange = true
      }
      this.currentValue = val
    },
    currentValue(val) {
      this.$refs.select.setQuery(val)
      $emit(this, 'update:modelValue', val)
      if (this.disableEmitChange) {
        this.disableEmitChange = false
        return
      }
      $emit(this, 'on-change', val)
      this.dispatch('FormItem', 'on-form-change', val)
    },
  },
  methods: {
    remoteMethod(query) {
      $emit(this, 'on-search', query)
    },
    handleSelect(option) {
      const val = option.value
      if (val === undefined || val === null) return
      this.currentValue = val
      this.$refs.input.blur()
      $emit(this, 'on-select', val)
    },
    handleFocus(event) {
      $emit(this, 'on-focus', event)
    },
    handleBlur(event) {
      $emit(this, 'on-blur', event)
    },
    handleClear() {
      if (!this.clearable) return
      this.currentValue = ''
      this.$refs.select.reset()
      $emit(this, 'on-clear')
    },
    handleClickOutside() {
      this.$nextTick(() => {
        this.$refs.input.blur()
      })
    },
  },
  emits: [
    'update:modelValue',
    'on-change',
    'on-search',
    'on-select',
    'on-focus',
    'on-blur',
    'on-clear',
  ],
}
</script>
