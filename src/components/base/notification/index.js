import { plantRenderPara } from '../../../utils/gogocodeTransfer.js'

import Notification from './notification.vue'
import { createVNode, render } from 'vue'

Notification.newInstance = (properties) => {
  const _props = properties || {}

  const container = document.createElement('div')
  const vm = createVNode(Notification, plantRenderPara({ props: _props }))

  vm.props.onDestroy = () => render(null, container)

  render(vm, container)
  document.body.appendChild(container.firstElementChild)

  const notification = vm.component.proxy
  return {
    notice(noticeProps) {
      notification.add(noticeProps)
    },
    remove(name) {
      notification.close(name)
    },
    component: notification,
    destroy(element) {
      notification.closeAll()
      setTimeout(function () {
        document.body.removeChild(document.getElementsByClassName(element)[0])
      }, 500)
    },
  }
}

export default Notification
