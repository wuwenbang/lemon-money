<template>
  <Layout>
    <div class="navBar">
      <span class="title">标签列表</span>
    </div>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.name" :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click.native="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import TagHelper from "@/mixin/TagHelper";
import { mixins } from "vue-class-component";

@Component({
  components: { Button }
})
export default class Labels extends mixins(TagHelper) {
  //createTag 通过 TagHelper Mixin
  get tagsList() {
    return this.$store.state.tagList;
  }
  tags = this.tagsList;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.navBar {
  margin-bottom: 12px;
  background: white;
  padding: 12px;
  display: flex;
  justify-content: center;
}
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
.createTag-wrapper {
  margin: 40px;
  display: flex;
  justify-content: center;
}
</style>

