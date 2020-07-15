<template>
  <div class="wrapper" ref="wrapper">
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { EChartOption } from "echarts";
import echarts from "echarts";
@Component
export default class Chart extends Vue {
  @Prop() options!: EChartOption;
  mounted() {
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    chart.setOption(this.options);
  }
}
</script>

<style lang='scss' scoped >
.wrapper {
  height: 400px;
  width: 100%;
}
</style>