<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="leftIcon" @click.native="back" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="notes-wrapper">
      <Notes :value="tag.name" @update:value="update" field-name="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>
  </Layout>
</template>
 
<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Notes from "../components/Money/Notes.vue";
import Button from "../components/Button.vue";
@Component({
  components: { Notes, Button }
})
export default class EditLabel extends Vue {
  get tag() {
    //computed
    return this.$store.state.currentTag;
  }
  get tagsList() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTags");
    this.$store.commit("setCurrentTag", this.$route.params.id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.tag) {
      this.$store.commit("updateTag", { id: this.tag.id, name });
    }
  }
  remove() {
    if (this.tag) {
      this.$store.commit("removeTag", this.tag.id);
      this.$router.back();
    }
  }
  back() {
    this.$router.back();
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