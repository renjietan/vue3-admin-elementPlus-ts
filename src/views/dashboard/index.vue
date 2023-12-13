<template>
  <div>
    <Pagination @pagination="getList" :total="data.total" v-model:page="data.page" v-model:pageSize="data.pageSize"></Pagination>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import Echats from "@/components/Echats/index.vue"
import Pagination from "@/components/Pagination/index.vue"
const data = reactive({
  page: 1,
  pageSize: 10,
  total: 100
})

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
const getList = (a, b) => {
  console.log(a,b);
}
</script>
