<template>
  <Layout>
    <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type" />
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart :options="x" class="chart"/>
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
@Component({
  components: { Tabs, Chart }
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
  get x() {
    return {
      grid:{
        left:0,
        right:0
      },
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      legend: {
        data: ["销量"]
      },
      xAxis: {
        data: [
          "1", "2", "3","4", "5", "6", "7","8","9","10",
          "11", "12","14", "13", "15", "16", "17","18","19","20",
          "21", "22", "23","24", "25", "26", "27","28","29","30",
          ],
          axisTick: {alignWithLabel: true},
          axisLine:{lineStyle:{color:'#666'}}
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          symbol:'circle',
          symbolSize:12,
          itemStyle:{
            borderWidth:2,
             color: "#41b883"
          },
          name: "销量",
          type: "line",
          data: [
            5, 20, 36, 10, 10, 20, 5, 20, 36, 10,
            5, 20, 36, 10, 10, 20, 5, 20, 36, 10,
            5, 20, 36, 10, 10, 20, 5, 20, 36, 10,
          ],
          tooltip:{
            show:true,
            triggerOn:'click',
            formatter:'{c}',
            position:'top'
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
  mounted(){
    (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 9999;
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
        &::-webkit-scrollbar{
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
