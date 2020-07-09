  
<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="onRecordSave" />
    <Types :value.sync="record.type" />
    <div class="notes-wrapper">
      <Notes :value.sync="record.notes" field-name="备注" placeholder="请输入备注" />
    </div>
    <Tags :tag-list.sync="tags" @update:value="onUpdateTags" class="tag" />
  </Layout>
</template> 

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
import recordModel from "@/models/recordModel.ts";
import tagModel from "../models/tagModel";

const recordList = recordModel.fetch();

@Component({
  components: { Tags, Notes, Types, NumberPad }
})
export default class Money extends Vue {
  tags = window.tagList;
  recordList: RecordItem[] = recordList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0
  };
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onRecordSave() {
    recordModel.create(this.record);
  }
  @Watch("recordList")
  onRecordListChange() {
    recordModel.save();
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
  padding: 12px;
}
</style>