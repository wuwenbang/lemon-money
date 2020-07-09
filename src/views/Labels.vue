<template>
  <Layout>
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
@Component({
  components: { Button }
})
export default class Labels extends Vue {
  tags = window.tagList;
  createTag() {
    const name = window.prompt("请输入标签名：");
    window.createTag(name);
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
.createTag-wrapper {
  margin: 40px;
  display: flex;
  justify-content: center;
}
</style>

