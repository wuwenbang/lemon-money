<template>
  <Layout>
    <Tabs
      class-prefix="types"
      :data-source="typeList"
      :value.sync="type"
    />
    <Tabs
      class-prefix="interval"
      :data-source="intervalList"
      :value.sync="interval"
    />
  </Layout>
</template>

<script lang="ts">
import Types from "../components/Money/Types.vue";
import Tabs from "@/components/Tabs.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({
  components: { Types, Tabs }
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = [
    { text: "按天", value: "day" },
    { text: "按月", value: "week" },
    { text: "按月", value: "month" }
  ];
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" }
  ];
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
::v-deep .types-tabs-item {
  background: white;
  &.selected {
    background: $color-theme;
    color: white;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  background: white;
  &.selected {
    background: $color-theme;
    color: white;
    &::after {
      background: white;
    }
  }
}
</style>
