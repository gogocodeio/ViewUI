export default {
    created() {
        if (this.$parent && this.$parent.vueChildren) {
            this.$parent.vueChildren.push(this);
        }
    },
    beforeDestroy() {
        //从父组件里面移除
        if (this.$parent && this.$parent.vueChildren) {
            const index = this.$parent.vueChildren.findIndex(item => item.id === this);
            this.$parent.vueChildren.splice(index, 1);
        }
    },
    data() {
        return { vueChildren: [] }
    }
}
