<template>
  <div>

    <Radio-group v-model="phone" size="small">
      <Radio label="apple" border>
        <Icon type="logo-apple"></Icon>
        <span>选项一</span>
      </Radio>
      <Radio label="android" border>
        <Icon type="logo-android"></Icon>
        <span>选项二</span>
      </Radio>
      <Radio label="windows" border>
        <Icon type="logo-windows"></Icon>
        <span>选项三</span>
      </Radio>
    </Radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      single: true,
      phone: '',
      button2: '北京',
    }
  },
  methods: {},
}
</script>
