<template>
  <div>
    <div class="demo-spin-article">
      <h3>登金陵凤凰台</h3>
      <address>李白</address>
      <article>
        <p>凤凰台上凤凰游，凤去台空江自流。</p>
        <p>吴宫花草埋幽径，晋代衣冠成古丘。</p>
        <p>三山半落青天外，二水中分白鹭洲。</p>
        <p>总为浮云能蔽日，长安不见使人愁。</p>
      </article>
      <Spin size="large" fix v-if="spinShow">
        <!--<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>-->
        <!--<div>Loading</div>-->
      </Spin>
    </div>
    <br />
    切换显示状态：<i-switch @on-change="spinShow = !spinShow"></i-switch>
    <Button @click="show">show</Button>
    <Button @click="hide">hide</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spinShow: true,
    }
  },
  methods: {
    show() {
      this.$Spin.show()
      setTimeout(() => {
        this.$Spin.hide()
      }, 3000)
    },
    hide() {
      this.$Spin.hide()
    },
  },
}
</script>

<style>
.demo-spin-article {
  padding: 10px;
  position: relative;
  border: 1px solid red;
  text-align: center;
}
.demo-spin-article h3 {
  font-size: 22px;
}
.demo-spin-article address {
  color: #999;
  font-style: normal;
  font-size: 14px;
}
.demo-spin-article p {
  font-size: 16px;
}
</style>
