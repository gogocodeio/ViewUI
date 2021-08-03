import * as Vue from 'vue'
export default function render(_props, _context) {
  const ctx = {
    ..._context,
    props: _props,
    data: _context.attr,
    children: _context.slots,
  }
  const params = {
    column: ctx.props.column,
    index: ctx.props.index,
  }
  return ctx.props.render(Vue.h, params)
}
