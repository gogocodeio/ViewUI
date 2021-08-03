import { $children } from '../../../utils/gogocodeTransfer'
import Notification from './notification.vue'
import * as Vue from 'vue'

Notification.newInstance = (properties) => {
  const _props = properties || {}

  const Instance = {
    render(h) {
      return h(Notification, {
        props: _props,
      })
    },
  }

  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const notification = $children(Instance)[0]

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
