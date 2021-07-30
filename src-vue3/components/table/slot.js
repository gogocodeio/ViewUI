import * as Vue from 'vue'
export default function render(_context) {
  const ctx = {
    ..._context,
    props: Vue.h,
    data: _context.attr,
    children: _context.slots,
  }
  return Vue.h(
    'div',
    {
      class: {
        'ivu-table-cell-slot': true,
        'ivu-table-cell-slot-inline': ctx.props.display === 'inline',
        'ivu-table-cell-slot-inline-block':
          ctx.props.display === 'inline-block',
      },
    },
    ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slot]({
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index,
    })
  )
}
