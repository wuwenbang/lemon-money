<template>
  <Layout>
    <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type" />
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{group.title}}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.time" class="record">
            <span>{{tagString(item.tags)}} </span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}} </span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>



<script lang="ts">
import recordTypeList from "../constants/recordTypeList";
import intervalList from "../constants/intervalList";
import Tabs from "@/components/Tabs.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({
  components: { Tabs }
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
  get recordList() {
    return (this.$store.state as StateType).recordList;
  }
  get result() {
    const { recordList } = this;
    type HashTableItem = { title: string; items: RecordItem[] };
    const hashTable: { [key: string]: HashTableItem } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].time!.split("T");
      hashTable[date] = hashTable[date] || { title: date, items: [] };
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags[0].name;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
%item {
  padding: 0 16px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  @extend %item;
}
.record {
  @extend %item;
  background: white;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

::v-deep {
  .types-tabs-item {
    background: white;
    &.selected {
      background: $color-theme;
      color: white;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
    font-size: 20px;
    background: #eee;
  }
}
</style>
