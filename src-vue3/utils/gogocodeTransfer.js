export function $children(instance) {
  function $walk(vnode, children) {
    if (vnode.component && vnode.component.proxy) {
      children.push(vnode.component.proxy)
    } else if (vnode.shapeFlag & (1 << 4)) {
      const vnodes = vnode.children
      for (let i = 0; i < vnodes.length; i++) {
        $walk(vnodes[i], children)
      }
    }
  }
  const root = instance.$.subTree
  const children = []
  if (root) {
    $walk(root, children)
  }
  return children
}
export function plantRenderPara(params) {
  const transProps = {
    staticClass: 'class',
    staticStyle: 'style',
    on: '',
    domProps: '',
    props: '',
    attrs: '',
  }
  function obj2arr(obj) {
    return typeof obj == 'string'
      ? [obj]
      : Object.keys(obj).map((pk, index) => {
          return { [pk]: Object.values(obj)[index] }
        })
  }
  let result = {}
  for (let key in params) {
    if (transProps[key] == null) {
      if (typeof params[key] == 'object') {
        result[key] = obj2arr(params[key])
      } else {
        result[key] = params[key]
      }
    }
  }
  for (let key in params) {
    if (transProps[key] === '') {
      if (typeof params[key] == 'object') {
        for (let k in params[key]) {
          result[key == 'on' ? 'on' + k.replace(k[0], k[0].toUpperCase()) : k] =
            params[key][k]
        }
      } else {
        result[key] = params[key]
      }
    }
  }
  for (let key in params) {
    if (transProps[key]) {
      result[transProps[key]] = result[transProps[key]] || []
      result[transProps[key]] = result[transProps[key]].concat(
        obj2arr(params[key])
      )
    }
  }
  return result
}
export function plantRenderPara(params) {
  const transProps = {
    staticClass: 'class',
    staticStyle: 'style',
    on: '',
    domProps: '',
    props: '',
    attrs: '',
  }
  function obj2arr(obj) {
    return typeof obj == 'string'
      ? [obj]
      : Object.keys(obj).map((pk, index) => {
          return { [pk]: Object.values(obj)[index] }
        })
  }
  let result = {}
  for (let key in params) {
    if (transProps[key] == null) {
      if (typeof params[key] == 'object') {
        result[key] = obj2arr(params[key])
      } else {
        result[key] = params[key]
      }
    }
  }
  for (let key in params) {
    if (transProps[key] === '') {
      if (typeof params[key] == 'object') {
        for (let k in params[key]) {
          result[k] = params[key][k]
        }
      } else {
        result[key] = params[key]
      }
    }
  }
  for (let key in params) {
    if (transProps[key]) {
      result[transProps[key]] = result[transProps[key]] || []
      result[transProps[key]] = result[transProps[key]].concat(
        obj2arr(params[key])
      )
    }
  }
  return result
}
