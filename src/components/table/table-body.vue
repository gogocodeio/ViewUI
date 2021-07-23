<script>
import { plantRenderPara } from '../../utils/gogocodeTransfer.js'
import * as Vue from 'vue'
// import tiny_emitter from 'tiny-emitter/instance'
// todo :key="row"
import TableTr from './table-tr.vue'
import TableCell from './cell.vue'
import Expand from './expand.js'
import Mixin from './mixin'
import Bus from '../../mixins/bus'

// const tiny_emitter_override = {
//   vueOn: (...args) => tiny_emitter.on(...args),
//   vueOnce: (...args) => tiny_emitter.once(...args),
//   vueOff: (...args) => tiny_emitter.off(...args),
//   $emit: (...args) => tiny_emitter.emit(...args),
// }
export default {
  name: 'TableBody',
  mixins: [Mixin, Bus],
  components: { TableCell, Expand, TableTr },
  props: {
    prefixCls: String,
    styleObject: Object,
    columns: Array,
    data: Array, // rebuildData
    objData: Object,
    columnsWidth: Object,
    fixed: {
      type: [Boolean, String],
      default: false,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: [Boolean, String],
      default: false,
    },
  },
  computed: {
    expandRender() {
      let render = function () {
        return ''
      }
      for (let i = 0; i < this.columns.length; i++) {
        const column = this.columns[i]
        if (column.type && column.type === 'expand') {
          if (column.render) render = column.render
        }
      }
      return render
    },
  },
  methods: {
    rowChecked(_index) {
      return this.objData[_index] && this.objData[_index]._isChecked
    },
    rowDisabled(_index) {
      return this.objData[_index] && this.objData[_index]._isDisabled
    },
    rowExpanded(_index) {
      return this.objData[_index] && this.objData[_index]._isExpanded
    },
    rowStatusByRowKey(type, rowKey) {
      const data = this.$parent.getDataByRowKey(rowKey)
      return data[type]
    },
    handleMouseIn(_index, event, rowKey) {
      event.stopPropagation()
      this.$parent.handleMouseIn(_index, rowKey)
    },
    handleMouseOut(_index, event, rowKey) {
      event.stopPropagation()
      this.$parent.handleMouseOut(_index, rowKey)
    },
    clickCurrentRow(_index, event, rowKey) {
      this.$parent.clickCurrentRow(_index, rowKey)
    },
    dblclickCurrentRow(_index, event, rowKey) {
      event.stopPropagation()
      this.$parent.dblclickCurrentRow(_index, rowKey)
    },
    clickCell(row, column, key, event) {
    //   Object.assign(this.$parent, tiny_emitter_override)
      this.$parent.vueEmit('on-cell-click', row, column, row[key], event)
    },
    contextmenuCurrentRow(_index, event, rowKey) {
      event.stopPropagation()
      if (this.$parent.contextMenu) event.preventDefault()
      this.$parent.contextmenuCurrentRow(_index, rowKey, event)
    },
    selectStartCurrentRow() {
      if (this.$parent.contextMenu) {
        // event.stopPropagation();
        // event.preventDefault();
      }
    },
    getSpan(row, column, rowIndex, columnIndex) {
      const fn = this.$parent.spanMethod
      if (typeof fn === 'function') {
        const result = fn({
          row,
          column,
          rowIndex,
          columnIndex,
        })
        let rowspan = 1
        let colspan = 1
        if (Array.isArray(result)) {
          rowspan = result[0]
          colspan = result[1]
        } else if (typeof result === 'object') {
          rowspan = result.rowspan
          colspan = result.colspan
        }
        return {
          rowspan,
          colspan,
        }
      } else {
        return {}
      }
    },
    showWithSpan(row, column, rowIndex, columnIndex) {
      const result = this.getSpan(row, column, rowIndex, columnIndex)
      return !(
        ('rowspan' in result && result.rowspan === 0) ||
        ('colspan' in result && result.colspan === 0)
      )
    },
    isTrShow(rowKey) {
      let status = true
      let child
      for (let i in this.objData) {
        const row = this.objData[i]
        const showChildren = row._isShowChildren
        if (row._rowKey === rowKey) {
          status = status && showChildren
          break
        } else if (row.children && row.children.length) {
          child = this.getTrStatus(rowKey, row, status && showChildren)
          if (child[0] && child[0]._rowKey === rowKey) {
            return child[1]
          }
        }
      }
      return status
    },
    getTrStatus(rowKey, data, parentStatus) {
      let status = parentStatus
      let childData
      if (data.children && data.children.length) {
        for (let i = 0; i < data.children.length; i++) {
          const row = data.children[i]
          const showChildren = row._isShowChildren
          if (row._rowKey === rowKey) {
            childData = row
            status = status && showChildren
            break
          } else if (row.children && row.children.length) {
            const child = this.getTrStatus(rowKey, row, status && showChildren)
            if (child[0] && child[0]._rowKey === rowKey) {
              return child
            }
          }
        }
      }
      return [childData, status]
    },
    getLevel(rowKey) {
      let level
      let child
      for (let i = 0; i < this.data.length; i++) {
        const row = this.data[i]
        if (row[this.rowKey] === rowKey) {
          level = 0
          break
        } else if (row.children && row.children.length) {
          child = this.getChildLevel(row, rowKey, 1)
          if (child[0] && child[0][this.rowKey] === rowKey) {
            return child[1]
          }
        }
      }
      return level
    },
    getChildLevel(data, rowKey, level) {
      let newLevel
      let childData
      if (data.children && data.children.length) {
        for (let i = 0; i < data.children.length; i++) {
          const row = data.children[i]
          if (row[this.rowKey] === rowKey) {
            childData = row
            newLevel = level
            break
          } else if (row.children && row.children.length) {
            const child = this.getChildLevel(row, rowKey, level + 1)
            if (child[0] && child[0][this.rowKey] === rowKey) {
              return child
            }
          }
        }
      }
      return [childData, newLevel]
    },
    getChildNode(h, data, nodes) {
      if (data.children && data.children.length) {
        data.children.forEach((row, index) => {
          let $tds = []

          this.columns.forEach((column, colIndex) => {
            if (this.showWithSpan(row, column, index, colIndex)) {
              const $tableCell = h(TableCell, {
                props: {
                  fixed: this.fixed,
                  'prefix-cls': this.prefixCls,
                  row: row,
                  column: column,
                  'natural-index': index,
                  index: row._index,
                  checked: this.rowStatusByRowKey('_isChecked', row._rowKey),
                  disabled: this.rowStatusByRowKey('_isDisabled', row._rowKey),
                  expanded: this.rowStatusByRowKey('_isExpanded', row._rowKey),
                  treeNode: true,
                  treeLevel: this.getLevel(row._rowKey),
                },
                key: column._columnKey,
              })

              const $td = h(
                'td',
                {
                  class: this.alignCls(column, row),
                  attrs: this.getSpan(row, column, index, colIndex),
                  on: {
                    click: (e) => this.clickCell(row, column, column.key, e),
                  },
                },
                [$tableCell]
              )
              $tds.push($td)
            }
          })

          // 判断节点是否展开
          const trStyle = {}
          if (!this.isTrShow(data._rowKey)) trStyle.display = 'none'

          const $tableTr = h(
            TableTr,
            {
              props: {
                draggable: false,
                row: row,
                'prefix-cls': this.prefixCls,
                isChildren: true,
              },
              style: trStyle,
              key: this.rowKey ? row._rowKey : index,
              nativeOn: {
                mouseenter: (e) =>
                  this.handleMouseIn(row._index, e, row._rowKey),
                mouseleave: (e) =>
                  this.handleMouseOut(row._index, e, row._rowKey),
                click: (e) => this.clickCurrentRow(row._index, e, row._rowKey),
                dblclick: (e) =>
                  this.dblclickCurrentRow(row._index, e, row._rowKey),
                contextmenu: (e) =>
                  this.contextmenuCurrentRow(row._index, e, row._rowKey),
                selectstart: (e) =>
                  this.selectStartCurrentRow(row._index, e, row._rowKey),
              },
            },
            $tds
          )

          nodes.push($tableTr)

          if (row.children && row.children.length) {
            this.getChildNode(h, row, nodes)
          }
        })
        return nodes
      } else {
        return nodes
      }
    },
  },
  render() {
    let $cols = []
    this.columns.forEach((column) => {
      const $col = Vue.h(
        'col',
        plantRenderPara({
          attrs: {
            width: this.setCellWidth(column),
          },
        })
      )
      $cols.push($col)
    })
    const $colgroup = Vue.h('colgroup', {}, $cols)

    let $tableTrs = []
    this.data.forEach((row, index) => {
      let $tds = []

      this.columns.forEach((column, colIndex) => {
        if (this.showWithSpan(row, column, index, colIndex)) {
          const $tableCell = Vue.h(
            TableCell,
            plantRenderPara({
              props: {
                fixed: this.fixed,
                'prefix-cls': this.prefixCls,
                row: row,
                column: column,
                'natural-index': index,
                index: row._index,
                checked: this.rowChecked(row._index),
                disabled: this.rowDisabled(row._index),
                expanded: this.rowExpanded(row._index),
              },
              key: column._columnKey,
            })
          )

          const $td = Vue.h(
            'td',
            plantRenderPara({
              class: this.alignCls(column, row),
              attrs: this.getSpan(row, column, index, colIndex),
              on: {
                click: (e) => this.clickCell(row, column, column.key, e),
              },
            }),
            [$tableCell]
          )
          $tds.push($td)
        }
      })

      const $tableTr = Vue.h(
        TableTr,
        plantRenderPara({
          props: {
            draggable: this.draggable,
            row: row,
            'prefix-cls': this.prefixCls,
          },
          key: this.rowKey ? row._rowKey : index,
          nativeOn: {
            mouseenter: (e) => this.handleMouseIn(row._index, e),
            mouseleave: (e) => this.handleMouseOut(row._index, e),
            click: (e) => this.clickCurrentRow(row._index, e),
            dblclick: (e) => this.dblclickCurrentRow(row._index, e),
            contextmenu: (e) => this.contextmenuCurrentRow(row._index, e),
            selectstart: (e) => this.selectStartCurrentRow(row._index, e),
          },
        }),
        $tds
      )
      $tableTrs.push($tableTr)

      // 可展开
      if (this.rowExpanded(row._index)) {
        const $Expand = Vue.h(
          Expand,
          plantRenderPara({
            props: {
              row: row,
              render: this.expandRender,
              index: row._index,
            },
            key: this.rowKey ? row._rowKey : index,
          })
        )
        const $td = Vue.h(
          'td',
          plantRenderPara({
            attrs: {
              colspan: this.columns.length,
            },
            class: this.prefixCls + '-expanded-cell',
          }),
          [$Expand]
        )
        const $tr = Vue.h(
          'tr',
          plantRenderPara({
            class: {
              [this.prefixCls + '-expanded-hidden']: this.fixed,
            },
          }),
          [$td]
        )
        $tableTrs.push($tr)
      }

      // 子数据
      if (row.children && row.children.length) {
        const $childNodes = this.getChildNode(Vue.h, row, [])
        $childNodes.forEach((item) => {
          $tableTrs.push(item)
        })
      }
    })

    const $tbody = Vue.h(
      'tbody',
      plantRenderPara({
        class: this.prefixCls + '-tbody',
      }),
      [$tableTrs]
    )

    return Vue.h(
      'table',
      plantRenderPara({
        attrs: {
          cellspacing: '0',
          cellpadding: '0',
          border: '0',
        },
        style: this.styleObject,
      }),
      [$colgroup, $tbody]
    )
  },
  emits: ['on-cell-click'],
}
</script>
