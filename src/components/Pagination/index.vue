<template>
  <div :style="style" class="pagination">
    <el-pagination
      :current-page="page"
      background
      :page-size="pageSize"
      :total="total"
      :page-sizes="pageSizes"
      :layout="layout"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue"

// 定义接收的 props
const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  style: {
    type: Object,
    default: () => ({
      "margin-top": "15px"
    }),
    validator: (v) => !!v["margin-top"]
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    required: true
  },
  layout: {
    type: String,
    default: "prev, pager, next, jumper,sizes, total"
  },
  pageSizes: {
    type: Array,
    default: [10, 20, 30, 40]
  }
})

// 定义发出的事件
const emit = defineEmits(["update:page", "update:pageSize", "pagination"])

// 处理页码变化
const handleCurrentChange = (newPage) => {
  emit("update:page", newPage)
  emit("pagination", newPage, props.pageSize)
}

// 处理每页条数变化
const handleSizeChange = (newSize) => {
  emit("update:pageSize", newSize)
  emit("pagination", props.page, newSize)
}
</script>

<style lang="scss">
  .pagination {
    padding: 8px 0;
    box-shadow: var(--v3-box-shadow);
    background: white;
    box-sizing: border-box;
  }
</style>
