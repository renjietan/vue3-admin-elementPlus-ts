<template>
  <div class="container">
    <div class="container-filter">
      <div class="container-filter-left">
        <el-input pre-icon="search" v-model="_t.flt.text" placeholder="请输入" clearable>
          <template #append>
            <el-button icon="Search" />
          </template>
        </el-input>
      </div>
      <div class="container-filter-right">
        <el-button @click="handleCreate" icon="plus" type="primary">新增问答对</el-button>
      </div>
    </div>
    <div class="container-content">
      <el-table border center :data="_t.table_conf.data" align-center :row-class-name="tableRowClassName">
        <el-table-column label="序号" width="70">
          <template #default="scope">
            <span style="color: var(--el-color-primary)">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="prop1" label="问题" />
        <el-table-column prop="prop2" label="回答" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" icon="Edit" @click="handleEdit"> 编辑 </el-button>
            <el-button type="danger" icon="delete" @click="handleDel"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination
      :total="_t.table_conf.total"
      v-model:page.sync="_t.table_conf.page"
      v-model:pageSize.sync="_t.table_conf.pageSize"
    ></Pagination>
    <!--NOTE(@date:2023-12-14 11:56:36 谭人杰): 标签修改-->
    <el-dialog
      v-model="_t.dialog_conf.visiable"
      :title="_t.dialog_conf.title"
      :destroy-on-close="_t.dialog_conf.isDestory"
      :draggable="_t.dialog_conf.draggable"
      :close-on-click-modal="_t.dialog_conf.closeOnClickModal"
    >
      <el-form>
        <el-form-item class="must-fill" label="问题">
          <el-input clearable></el-input>
        </el-form-item>
        <el-form-item class="must-fill" label="回答">
          <el-input clearable></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="_t.dialog_conf.visiable = false">取消</el-button>
          <el-button type="primary" @click="_t.dialog_conf.visiable = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { getRandomChineseWord, getRandomString, lan_opt } from "@/utils/mock-data/index.js"
import { reactive, onMounted } from "vue"
import { ElMessageBox, ElMessage } from "element-plus"

const _t = reactive({
  flt: {
    text: ""
  },
  opt_conf: {
    lan_opt
  },
  table_conf: {
    data: [],
    total: 100,
    page: 1,
    pageSize: 10
  },
  dialog_conf: {
    visiable: false,
    title: "修改",
    isDestory: false, //关闭前销毁
    draggable: true, //拖拽
    closeOnClickModal: false
  },
  form_data: {
    left_title: "",
    right_title: "",
    old_text: "",
    text: ""
  }
})

const tableRowClassName = ({ row, rowIndex }) => {
  if (rowIndex % 2 != 0) {
    return "warning-row"
  } else {
    return "success-row"
  }
  return ""
}

const handleCreate = () => {
  _t.dialog_conf.title = '新增'
  _t.dialog_conf.visiable = true
}

const handleEdit = () => {
  _t.dialog_conf.title = '编辑'
  _t.dialog_conf.visiable = true
}

const handleDel = () => {
  ElMessageBox.confirm("确认删除？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true
  }).then(() => {
    ElMessage({
      type: "success",
      message: "删除成功"
    })
  })
}

onMounted(() => {
  _t.table_conf.data = Array.from({ length: 10 }).map((item) => ({
    isSc: false,
    prop1: getRandomChineseWord(5),
    prop2: getRandomChineseWord(20)
  }))
})
</script>

<style lang="scss" scoped>
.fy_title {
  margin-bottom: 15px;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.input {
  :deep(.el-textarea__inner) {
    height: 700px !important;
  }
}
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
