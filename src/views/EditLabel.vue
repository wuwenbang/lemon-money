<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="leftIcon" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="notes-wrapper">
      <Notes field-name="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import tagModel from "../models/tagModel";
import Notes from "../components/Money/Notes.vue";
import Button from "../components/Button.vue";
@Component({
  components: { Notes, Button }
})
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    tagModel.fetch();
    const tags = tagModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang='scss' scoped >
.navBar {
  background: white;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  .leftIcon {
    height: 24px;
    width: 24px;
  }
  .title {
  }
  .rightIcon {
    height: 24px;
    width: 24px;
  }
}
.notes-wrapper {
  background: white;
  margin-top: 12px;
  padding: 0;
}
.button-wrapper {
  text-align: center;
  margin: 40px;
  button {
    background: #dc143c;
  }
}
</style>