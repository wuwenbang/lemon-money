<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <input v-model="notes" type="text" :placeholder="this.placeholder" />
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
  notes = this.value;
  @Watch("notes")
  onValueChanged(value: string, oldValue: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
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