<script>
import * as Vue from 'vue'
import Children from '../../mixins/children'
import Bus from '../../mixins/bus'
const returnArrayFn = () => []

export default {
    mixins: [Children, Bus],
  props: {
    options: {
      type: Array,
      default: returnArrayFn,
    },
    slotOptions: {
      type: Array,
      default: returnArrayFn,
    },
    slotUpdateHook: {
      type: Function,
      default: () => {},
    },
  },
  // if use functional, there will be memory leaks
  // functional: true,
  render() {
    // to detect changes in the $slot children/options we do this hack
    // so we can trigger the parents computed properties and have everything reactive
    // although $slot.default is not
    if (this.slotOptions !== this.$parent.$slots.default && this.$parent.$slots.default())
      this.slotUpdateHook()
    return Vue.h('ul', [this.$slots.default && this.$slots.default(), this.options])
  },
}
</script>
