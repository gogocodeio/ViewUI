<template>
  <div :class="classes">
    <a
      v-if="to"
      :href="linkUrl"
      :target="target"
      class="ivu-cell-link"
      @click.exact="handleClickItem($event, false)"
      @click.ctrl="handleClickItem($event, true)"
      @click.meta="handleClickItem($event, true)"
    >
      <CellItem :title="title" :label="label" :extra="extra">
        <template v-slot:icon>
          <slot name="icon"></slot>
        </template>
        <template v-slot:default>
          <slot></slot>
        </template>
        <template v-slot:extra>
          <slot name="extra"></slot>
        </template>
        <template v-slot:label>
          <slot name="label"></slot>
        </template>
      </CellItem>
    </a>
    <div class="ivu-cell-link" v-else @click="handleClickItem">
      <CellItem :title="title" :label="label" :extra="extra">
        <template v-slot:icon>
          <slot name="icon"></slot>
        </template>
        <template v-slot:default>
          <slot></slot>
        </template>
        <template v-slot:extra>
          <slot name="extra"></slot>
        </template>
        <template v-slot:label>
          <slot name="label"></slot>
        </template>
      </CellItem>
    </div>
    <div class="ivu-cell-arrow" v-if="to">
      <slot name="arrow">
        <Icon :type="arrowType" :custom="customArrowType" :size="arrowSize" />
      </slot>
    </div>
  </div>
</template>

<script>
import CellItem from './cell-item.vue'
import Icon from '../icon/icon.vue'
import mixinsLink from '../../mixins/link'

const prefixCls = 'ivu-cell'

export default {
  name: 'Cell',
  inject: ['cellGroup'],
  mixins: [mixinsLink],
  components: { CellItem, Icon },
  props: {
    name: {
      type: [String, Number],
    },
    title: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    extra: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prefixCls: prefixCls,
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-selected`]: this.selected,
          [`${prefixCls}-with-link`]: this.to,
        },
      ]
    },
    // 3.4.0, global setting customArrow 有值时，arrow 赋值空
    arrowType() {
      let type = 'ios-arrow-forward'

      if (window.$IVIEW) {
        if (window.$IVIEW.cell.customArrow) {
          type = ''
        } else if (window.$IVIEW.cell.arrow) {
          type = window.$IVIEW.cell.arrow
        }
      }
      return type
    },
    // 3.4.0, global setting
    customArrowType() {
      let type = ''

      if (window.$IVIEW) {
        if (window.$IVIEW.cell.customArrow) {
          type = window.$IVIEW.cell.customArrow
        }
      }
      return type
    },
    // 3.4.0, global setting
    arrowSize() {
      let size = ''

      if (window.$IVIEW) {
        if (window.$IVIEW.cell.arrowSize) {
          size = window.$IVIEW.cell.arrowSize
        }
      }
      return size
    },
  },
  methods: {
    handleClickItem(event, new_window) {
      this.cellGroup.handleClick(this.name)

      this.handleCheckClick(event, new_window)
    },
  },
}
</script>
