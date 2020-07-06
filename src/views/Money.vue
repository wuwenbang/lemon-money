  
<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="onRecordSave" />
    <Types :value.sync="record.type" />
    <Notes :value.sync="record.notes" />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    {{recordList}}
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  time?: Date;
};

@Component({
  components: { Tags, Notes, Types, NumberPad }
})
export default class Money extends Vue {
  tags = ["餐饮", "交通", "住宿", "生活用品"];
  recordList: Record[] = JSON.parse(
    window.localStorage.getItem("record") || "[]"
  );
  record: Record = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0
  };
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onRecordSave() {
    const record2: Record = JSON.parse(JSON.stringify(this.record));
    record2.time = new Date();
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onRecordListChange() {
    window.localStorage.setItem("record", JSON.stringify(this.recordList));
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>