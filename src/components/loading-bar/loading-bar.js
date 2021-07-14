import { plantRenderPara } from '../../utils/gogocodeTransfer.js'
import LoadingBar from './loading-bar.vue'
import * as Vue from 'vue'

LoadingBar.newInstance = (properties) => {
  const _props = properties || {}

  const Instance = new Vue({
    data: _props,
    render() {
      return Vue.h(
        LoadingBar,
        plantRenderPara({
          props: _props,
        })
      )
    },
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const loading_bar = Instance.$children[0]

  return {
    update(options) {
      if ('percent' in options) {
        loading_bar.percent = options.percent
      }
      if (options.status) {
        loading_bar.status = options.status
      }
      if ('show' in options) {
        loading_bar.show = options.show
      }
    },
    component: loading_bar,
    destroy() {
      document.body.removeChild(
        document.getElementsByClassName('ivu-loading-bar')[0]
      )
    },
  }
}

export default LoadingBar
