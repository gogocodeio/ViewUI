<template>
  <div>
    <!-- <InputNumber :max="1000000000" :min="1" v-model="value1" :formatter="formatter" :parser="parser" @on-change="change" style="width: 200px"></InputNumber>
          <InputNumber :max="1000000000" :min="1" v-model="value2" :formatter="formatter2" :parser="parser2" @on-change="change" style="width: 200px"></InputNumber>

          <InputNumber @on-change="change" style="width: 200px"></InputNumber>

          <InputNumber v-model="valueNull" @on-change="change" style="width: 200px"></InputNumber>
          <InputNumber v-model="valueNull" @on-change="change" :formatter="formatter" :parser="parser" style="width: 200px"></InputNumber>

          <InputNumber v-model="value2" @on-focus="focus" style="width: 200px"></InputNumber>

          <InputNumber v-model="value3" style="width: 200px" placeholder="Enter something..."></InputNumber> -->

    <InputNumber
      v-model="valueNull"
      style="width: 200px"
      :min="1"
      :max="10000"
      :precision="2"
    ></InputNumber>
    <InputNumber v-model="valueNull" style="width: 200px"></InputNumber>
    <div style="margin: 10px 0px">
      <InputNumber
        :activeChange="false"
        v-model="valueNull"
        style="width: 200px"
        :min="1"
        :max="10000"
        :precision="2"
      ></InputNumber>
      <InputNumber
        :activeChange="false"
        v-model="valueNull"
        style="width: 200px"
      ></InputNumber>
    </div>
    <div style="margin: 10px 0px">
      <InputNumber
        :max="10000"
        v-model="value9"
        :formatter="(value) => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
        :parser="(value) => value.replace(/\$s?|(,*)/g, '')"
      ></InputNumber>
      <InputNumber
        :max="100"
        v-model="value10"
        :formatter="(value) => `${value}%`"
        :parser="(value) => value.replace('%', '')"
      ></InputNumber>
    </div>
    <Divider></Divider>
    <InputNumber
      disabled
      size="large"
      controls-outside
      :max="1000"
      :min="1"
      v-model="value20"
    ></InputNumber>
    <InputNumber
      size="default"
      controls-outside
      :max="1000"
      :min="1"
      v-model="value20"
    ></InputNumber>
    <InputNumber
      size="small"
      controls-outside
      :max="1000"
      :min="1"
      v-model="value20"
    ></InputNumber>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 1800000,
      value2: 55,
      value3: 100,
      valueNull: null,
      formatter: (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      parser: (value) => value.replace(/\$\s?|(,*)/g, ''),
      formatter2: (value) => `${value}%`,
      parser2: (value) => value.replace('%', ''),
      value9: 1000,
      value10: 100,
      value20: 2,
    }
  },
  methods: {
    focus(e) {
      e.target.select()
    },
    change(v) {
      console.log(v)
    },
  },
}
</script>
