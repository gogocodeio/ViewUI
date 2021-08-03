import * as Vue from 'vue'
export default {
  methods: {
    handleEscape(e) {
      this.dispatch('ColorPicker', 'on-escape-keydown', e)
    },
  },
}
