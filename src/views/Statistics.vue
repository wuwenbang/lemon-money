<template>
  <Layout>
    <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type" />
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
    <ol>
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{beautify(group.title)}}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
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
import dayjs from "dayjs";
import clone from "../lib/clone";
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
  get groupedList() {
    const { recordList } = this;
    type HashTableValue = { title: string; items: RecordItem[] };
    const newList = clone(recordList).sort(
      (a, b) => dayjs(b.time).valueOf() - dayjs(a.time).valueOf()
    );
    const result = [
      {
        title: dayjs(newList[0].time).format("YYYY-MM-DD"),
        items: [newList[0]]
      }
    ];
    for (let i = 0; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.time), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.time).format("YYYY-MM-DD"),
          items: [current]
        });
      }
    }
    console.log(result);
    return result;
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags[0].name;
  }
  beautify(time: string) {
    const day = dayjs(time);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("YYYY年M月D日");
    } else {
      return day.format("M月D日");
    }
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
