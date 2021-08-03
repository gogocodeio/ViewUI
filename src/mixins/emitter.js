import { $children, $emit } from '../utils/gogocodeTransfer'
function broadcast(componentName, eventName, params) {
  $children(this).forEach((child) => {
    const name = child.$options.name

    if (name === componentName) {
      $emit(child, eventName, params)
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        $emit(parent, eventName, params)
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    },
  },
}
