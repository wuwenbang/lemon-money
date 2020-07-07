<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag" :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import tagModel from "@/models/tagModel.ts";
tagModel.fetch();
@Component
export default class Labels extends Vue {
  tags = tagModel.data;
  createTag() {
    const name = window.prompt("请输入标签名：");
    if (name) {
      const message = tagModel.create(name);
      if (message === "duplicated") {
        window.alert("添加失败：标签名重复");
      } else if (message === "success") {
        window.alert("添加成功");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  background: white;
  padding-left: 16px;
  font-size: 16px;
  .tag {
    min-height: 44px;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    svg {
      margin-right: 16px;
      color: #666;
    }
  }
}
.createTag {
  border: none;
  background: $color-theme;
  color: white;
  height: 40px;
  padding: 0 16px;
  border-radius: 4px;
  text-align: center;
  &-wrapper {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>

