<template>
  <Layout>
    <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type" />
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart :options="chartOptions" class="chart" />
    </div>
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title"><span>{{beautify(group.title)}}</span><span>￥{{group.total}}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{tagString(item.tag)}} </span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}} </span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="no-records">
      <span>目前没有相关记录</span>
    </div>
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
import Chart from "@/components/Chart.vue";
import day from "dayjs";
import _ from "lodash";
@Component({
  components: { Tabs, Chart }
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;

  get keyValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = day(today)
        .subtract(i, "day")
        .format("YYYY-MM-DD");
      const found = _.find(this.groupedList, {
        title: dateString
      });
      array.push({
        date: dateString,
        value: found ? found.total : 0
      });
    }
    const chartData = this.recordList.map(item => ({
      item: item.time,
      amount: item.amount
    }));
    array.sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (a === b) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }

  get chartOptions() {
    const keys = this.keyValueList.map(item => item.date);
    const values = this.keyValueList.map(item => item.value);
    return {
      grid: {
        left: 40,
        right: 0
      },
      tooltip: {},
      legend: {
        data: ["金额"]
      },
      xAxis: {
        data: keys,
        axisTick: { alignWithLabel: true },
        axisLine: { lineStyle: { color: "#666" } },
        axisLabel: {
          formatter: function(value: string, index: number) {
            return value.substr(5);
          }
        }
      },
      yAxis: {
        type: "value",
        axisLabel: {
          show: true
        },
        splitLine: {
          show: true
        }
      },
      series: [
        {
          symbol: "circle",
          symbolSize: 12,
          itemStyle: {
            borderWidth: 2,
            color: "#41b883"
          },
          name: "金额",
          type: "line",
          data: values,
          tooltip: {
            show: true,
            triggerOn: "click",
            formatter: "{c}",
            position: "top"
          }
        }
      ]
    };
  }
  get recordList() {
    return (this.$store.state as StateType).recordList;
  }
  get groupedList() {
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const { recordList } = this;

    const newList = clone(recordList)
      .filter(t => t.type === this.type)
      .sort((a, b) => dayjs(b.time).valueOf() - dayjs(a.time).valueOf());

    if (newList.length === 0) {
      return [] as Result;
    }
    const result: Result = [
      {
        title: dayjs(newList[0].time).format("YYYY-MM-DD"),
        items: [newList[0]]
      }
    ];
    for (let i = 1; i < newList.length; i++) {
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
    result.forEach(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });

    return result;
  }
  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
  }
  created() {
    this.$store.commit("fetchRecords");
    this.$store.commit("fetchTags");
  }
  tagString(tag: Tag) {
    return tag ? tag.name : "无";
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
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
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
.no-records {
  padding: 16px;
  text-align: center;
}
.chart {
  width: 430%;
  &-wrapper {
    overflow: auto;
  }
}

::v-deep {
  .types-tabs-item {
    background: #ddd;
    &.selected {
      background: $color-theme;
      color: white;
      &::after {
        display: none;
        &::-webkit-scrollbar {
          display: none;
        }
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
