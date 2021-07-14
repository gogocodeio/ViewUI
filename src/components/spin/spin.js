import { plantRenderPara } from '../../utils/gogocodeTransfer.js'
import * as Vue from 'vue'
import Spin from './spin.vue'

import { transferIndex, transferIncrease } from '../../utils/transfer-queue'

function handleGetIndex() {
  transferIncrease()
  return transferIndex
}

let tIndex = handleGetIndex()

Spin.newInstance = (properties) => {
  const _props = properties || {}

  const Instance = new Vue({
    data: Object.assign({}, _props, {}),
    render() {
      let vnode = ''
      if (this.render) {
        vnode = Vue.h(
          Spin,
          plantRenderPara({
            props: {
              fix: true,
              fullscreen: true,
            },
          }),
          [this.render(Vue.h)]
        )
      } else {
        vnode = Vue.h(
          Spin,
          plantRenderPara({
            props: {
              size: 'large',
              fix: true,
              fullscreen: true,
            },
          })
        )
      }
      return Vue.h(
        'div',
        plantRenderPara({
          class: 'ivu-spin-fullscreen ivu-spin-fullscreen-wrapper',
          style: {
            'z-index': 2010 + tIndex,
          },
        }),
        [vnode]
      )
    },
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const spin = Instance.$children[0]

  return {
    show() {
      spin.visible = true
      tIndex = handleGetIndex()
    },
    remove(cb) {
      spin.visible = false
      setTimeout(function () {
        spin.$parent.$destroy()
        if (
          document.getElementsByClassName('ivu-spin-fullscreen')[0] !==
          undefined
        ) {
          document.body.removeChild(
            document.getElementsByClassName('ivu-spin-fullscreen')[0]
          )
        }
        cb()
      }, 500)
    },
    component: spin,
  }
}

export default Spin
