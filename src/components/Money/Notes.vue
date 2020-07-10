<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <input
        :value="value"
        @input="onValueChanged($event.target.value)"
        type="text"
        :placeholder="placeholder"
      />
    </label>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop() fieldName!: string;
  @Prop() placeholder!: string;
  @Prop() readonly value!: string;

  @Watch("value")
  onValueChanged(value: string, oldValue: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>