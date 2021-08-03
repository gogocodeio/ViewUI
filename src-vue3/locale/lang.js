import * as Vue from 'vue'
const isServer = false

export default function (lang) {
  if (!isServer) {
    if (typeof window.iview !== 'undefined') {
      if (!('langs' in iview)) {
        iview.langs = {}
      }
      iview.langs[lang.i.locale] = lang
    }
  }
}
/*eslint-enable */
