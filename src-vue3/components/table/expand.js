import * as Vue from 'vue'
export default function render(_context) {
  const ctx = {
    ..._context,
    props: Vue.h,
    data: _context.attr,
    children: _context.slots,
  }
  const params = {
    row: ctx.props.row,
    index: ctx.props.index,
  }
  if (ctx.props.column) params.column = ctx.props.column
  return ctx.props.render(Vue.h, params)
}
