  
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
  get recordList() {
    return this.$store.state.recordList;
  }
  get tagList() {
    return this.$store.state.tagList;
  }
  tags = this.tagList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0
  };
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onCreateRecord() {
    this.$store.commit("createRecord", this.record);
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