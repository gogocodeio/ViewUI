<template>
  <div :class="classes" :name="name">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf, findComponentsDownward } from '../../utils/assist'
import Emitter from '../../mixins/emitter'

const prefixCls = 'ivu-radio-group'

let seed = 0
const now = Date.now()
const getUuid = () => `ivuRadioGroup_${now}_${seed++}`

export default {
  name: 'RadioGroup',
  mixins: [Emitter],
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
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
    type: {
      validator(value) {
        return oneOf(value, ['button'])
      },
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: getUuid,
    },
    // 4.5.0
    buttonStyle: {
      validator(value) {
        return oneOf(value, ['default', 'solid'])
      },
      default: 'default',
    },
  },
  data() {
    return {
      currentValue: this.modelValue,
      childrens: [],
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`ivu-radio-${this.size}`]: !!this.size,
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-button-${this.buttonStyle}`]:
            this.type === 'button' && this.buttonStyle !== 'default',
          [`${prefixCls}-vertical`]: this.vertical,
        },
      ]
    },
  },
  mounted() {
    this.updateValue()
  },
  methods: {
    updateValue() {
      this.childrens = findComponentsDownward(this, 'Radio')

      if (this.childrens) {
        this.childrens.forEach((child) => {
          child.currentValue = this.currentValue === child.label
          child.group = true
        })
      }
    },
    change(data) {
      this.currentValue = data.value
      this.updateValue()
      this.$emit('update:modelValue', data.value)
      this.$emit('on-change', data.value)
      this.dispatch('FormItem', 'on-form-change', data.value)
    },
  },
  watch: {
    modelValue() {
      if (this.currentValue !== this.modelValue) {
        this.currentValue = this.modelValue
        this.$nextTick(() => {
          this.updateValue()
        })
      }
    },
  },
  emits: ['update:modelValue', 'on-change'],
}
</script>
