import { plantRenderPara } from '../../utils/gogocodeTransfer'
import * as Vue from 'vue'
export default {
  name: 'SliderMarker',
  props: {
    mark: {
      type: [String, Object],
    },
  },
  render() {
    let label = typeof this.mark === 'string' ? this.mark : [this.mark.label]

    return Vue.h(
      'div',
      plantRenderPara({
        class: 'ivu-slider-marks-item',
        style: this.mark.style || {},
      }),
      label
    )
  },
}
