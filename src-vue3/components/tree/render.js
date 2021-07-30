import * as Vue from 'vue'
export default function render(_context) {
  const ctx = {
    ..._context,
    props: Vue.h,
    data: _context.attr,
    children: _context.slots,
  }
  const params = {
    root: ctx.props.node[0],
    node: ctx.props.node[1],
    data: ctx.props.data,
  }
  return ctx.props.render(Vue.h, params)
}
