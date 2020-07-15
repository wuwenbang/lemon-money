<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <template v-if="type==='date'">
        <input :type="type||'text'" :value="dateHandle(value)" @input="onValueChanged($event.target.value)" :placeholder="placeholder" />
      </template>
      <template v-else>
        <input :type="type||'text'" :value="value" @input="onValueChanged($event.target.value)" :placeholder="placeholder" />
      </template>

    </label>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import dayjs from "dayjs";
@Component
export default class Notes extends Vue {
  @Prop() fieldName!: string;
  @Prop() placeholder!: string;
  @Prop() readonly value!: string;
  @Prop() type?: string;

  onValueChanged(value: string, oldValue: string) {
    this.$emit("update:value", value);
  }
  dateHandle(isostring: string) {
    return dayjs(isostring).format("YYYY-MM-DD");
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  padding-left: 8px;
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