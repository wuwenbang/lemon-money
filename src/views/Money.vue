  
<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="onCreateRecord" />
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
import { Component } from "vue-property-decorator";

@Component({
  components: { Tags, Notes, Types, NumberPad }
})
export default class Money extends Vue {
  tags = window.tagList;
  recordList = window.recordList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0
  };
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onCreateRecord() {
    window.createRecord(this.record);
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