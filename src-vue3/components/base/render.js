import * as Vue from 'vue'
export default function render(_context) {
  const ctx = {
    ..._context,
    props: Vue.h,
    data: _context.attr,
    children: _context.slots,
  }
  return ctx.props.render(Vue.h)
}
