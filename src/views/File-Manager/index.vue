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
    </div>
    <div class="container-content">
      <el-table border :data="_t.table_conf.data" align-center :row-class-name="tableRowClassName">
        <el-table-column prop="prop1" label="文件名" />
        <el-table-column prop="prop2" label="主题" />
        <el-table-column prop="prop3" label="作者" />
        <el-table-column prop="prop4" label="关键词" />
        <el-table-column label="收藏">
          <template #default="scope">
            <SvgIcon
              @click="scope.row.isSc = !scope.row.isSc"
              style="cursor: pointer"
              :name="scope.row.isSc ? 'sc-fulled' : 'sc-empty'"
            ></SvgIcon>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" text bg @click="_t.dialog_conf.visiable = true">标签修改</el-button>
            <el-dropdown trigger="click" @command="handleTransFormer">
              <el-button text type="warning">
                翻译<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="item in _t.opt_conf.lan_opt" command="英译中">英译中</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
        <el-form-item class="must-fill" label="标签">
          <el-select clearable></el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="_t.dialog_conf.visiable = false">取消</el-button>
          <el-button type="primary" @click="_t.dialog_conf.visiable = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--NOTE(@date:2023-12-14 11:56:48 谭人杰): 翻译-->
    <el-dialog
      v-model="_t.dialog_conf_fy.visiable"
      :title="_t.dialog_conf_fy.title"
      :destroy-on-close="_t.dialog_conf_fy.isDestory"
      :draggable="_t.dialog_conf_fy.draggable"
      :close-on-click-modal="_t.dialog_conf_fy.closeOnClickModal"
      width="1100"
    >
      <el-row :gutter="49">
        <el-col :span="12">
          <div class="fy_title">
            {{ _t.form_data.left_title }}
          </div>
          <div
            style="
              height: 600px;
              overflow-y: scroll;
              overflow-x: hidden;
              width: 100%;
              border: 1px solid var(--el-border-color);
              word-wrap: break-word;
              padding: 10px;
            "
          >
            {{ _t.form_data.old_text }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="fy_title">
            <span style="--un-animation-delay:0.6s" class="animate-jump">
              {{ _t.form_data.right_title }}
            </span>
          </div>
          <TypeWriter
            height="600px"
            style="border: 1px solid var(--el-border-color)"
            :text="_t.form_data.text"
          ></TypeWriter>
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="_t.dialog_conf_fy.visiable = false">取消</el-button>
          <el-button type="primary" @click="_t.dialog_conf_fy.visiable = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { getRandomChineseWord, getRandomString, lan_opt } from "@/utils/mock-data/index.js"
import { reactive, onMounted } from "vue"
import TypeWriter from "@/components/TypeWriter/index.vue"

const _t = reactive({
  flt: {
    text: ""
  },
  opt_conf: {
    lan_opt,
  },
  table_conf: {
    data: [],
    total: 100,
    page: 1,
    pageSize: 10
  },
  dialog_conf: {
    visiable: false,
    title: "标签修改",
    isDestory: false, //关闭前销毁
    draggable: true, //拖拽
    closeOnClickModal: false
  },
  dialog_conf_fy: {
    visiable: false,
    title: "翻译",
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

const handleTransFormer = (v) => {
  _t.form_data.text = getRandomChineseWord(100)
  _t.form_data.old_text = getRandomString(1000)
  _t.form_data.left_title = v?.split("译")?.[0] ?? ""
  _t.form_data.right_title = v?.split("译")?.[1] ?? ""
  _t.dialog_conf_fy.visiable = true
}

const tableRowClassName = ({ row, rowIndex }) => {
  if (rowIndex % 2 != 0) {
    return "warning-row"
  } else {
    return "success-row"
  }
  return ""
}

onMounted(() => {
  _t.table_conf.data = Array.from({ length: 10 }).map((item) => ({
    isSc: false,
    prop2: Math.random(),
    prop3: Math.random(),
    prop4: Math.random(),
    prop5: Math.random()
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
