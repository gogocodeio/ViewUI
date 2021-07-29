import { plantRenderPara } from '../../utils/gogocodeTransfer.js'
import LoadingBar from './loading-bar.vue'
import { createVNode, render } from 'vue'

LoadingBar.newInstance = (properties) => {
  const _props = properties || {}

  const container = document.createElement('div')
  const vm = createVNode(LoadingBar, plantRenderPara({ props: _props }))

  vm.props.onDestroy = () => {
    render(null, container)
  }

  render(vm, container)
  document.body.appendChild(container.firstElementChild)

  const loadingBar = vm.component.proxy

  return {
    update(options) {
      if ('percent' in options) {
        loadingBar.percent = options.percent
      }
      if (options.status) {
        loadingBar.status = options.status
      }
      if ('show' in options) {
        loadingBar.show = options.show
      }
    },
    component: loadingBar,
    destroy() {
      document.body.removeChild(
        document.getElementsByClassName('ivu-loading-bar')[0]
      )
    },
  }
}

export default LoadingBar
