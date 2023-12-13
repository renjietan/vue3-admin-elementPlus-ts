<template>
  <div ref="chart" :style="{ width: width, height: height }"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import { ECharts, EChartsOption } from 'echarts';

const props = defineProps({
  option: {
    type: Object as () => EChartsOption,
    required: true
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  }
});

const chart = ref<HTMLDivElement | null>(null);
let myChart: ECharts | null = null;

onMounted(() => {
  if (chart.value) {
    myChart = echarts.init(chart.value);
    myChart.setOption(props.option);
  }
});

onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
  }
});

watch(() => props.option, (newOption) => {
  myChart?.setOption(newOption);
}, { deep: true });
</script>
