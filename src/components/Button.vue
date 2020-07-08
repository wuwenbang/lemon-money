<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Button extends Vue {}
</script>

<style lang='scss' scoped >
@import "~@/assets/style/helper.scss";
.button {
  border: none;
  background: $color-theme;
  color: white;
  height: 40px;
  padding: 0 16px;
  border-radius: 4px;
  text-align: center;
}
</style>