  
<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="onCreateRecord" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <div class="notes-wrapper">
      <Notes :value.sync="record.notes" field-name="备注" type="text" placeholder="请输入备注" />
      <Notes :value.sync="record.time" field-name="日期" type="date" />
    </div>
    <Tags :tag-list.sync="tags" @update:value="onUpdateTags" class="tag" />
  </Layout>
</template>  

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "../constants/recordTypeList";
import Tabs from "../components/Tabs.vue";

@Component({
  components: { Tags, Notes, Tabs, NumberPad }
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }
  get tagList() {
    return this.$store.state.tagList;
  }
  recordTypeList = recordTypeList;
  tags = this.tagList;
  record: RecordItem = {
    tag: { name: "none", id: "none" },
    notes: "",
    type: "-",
    amount: 0,
    time: new Date().toISOString()
  };
  beforeCreate() {
    const initTags = ["通用", "交通", "饮食", "住宿"];
    if (localStorage.getItem("tagList") === null) {
      for (let tag of initTags) {
        this.$store.commit("createTag", tag);
      }
    }
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateTags(value: Tag) {
    this.record.tag = value;
  }
  onCreateRecord() {
    this.$store.commit("createRecord", this.record);
    this.record.notes = "";
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.tag {
  background: white;
}
.notes-wrapper {
  padding: 6px;
}
</style>