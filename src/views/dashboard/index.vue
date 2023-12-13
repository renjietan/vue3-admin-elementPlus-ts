<template>
  <div>
    <!-- <Echats :style="{ width: '100%', height: '100%' }" :option="options"></Echats> -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import Echats from "@/components/Echats/index.vue"
const options = ref({
  xAxis: {
    type: "category",
    data: ["礼拜一", "礼拜二", "礼拜三", "礼拜四", "礼拜五", "礼拜六", "礼拜天"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      universalTransition: {
        enabled: true
      }
    }
  ]
})
</script>
