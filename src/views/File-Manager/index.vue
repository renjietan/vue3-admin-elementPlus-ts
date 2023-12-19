<template>
  <div class="container">
    <div class="container-filter">
      <div class="container-filter-left">
        <el-input pre-icon="search" v-model="_t.flt.text" placeholder="请输入" clearable>
          <template #append>
            <el-button icon="Search" />
          </template>
        </el-input>
        <el-checkbox style="margin-left: 15px">收藏</el-checkbox>
      </div>
      <div class="container-filter-right">
        <el-button icon="plus" @click="handleDialog('情报上传')" type="primary">情报上传</el-button>
      </div>
    </div>
    <div class="container-content">
      <el-table border :data="_t.table_conf.data" align-center :row-class-name="tableRowClassName">
        <el-table-column prop="prop1" width="70" label="序号">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="prop1" label="文件名" />
        <el-table-column prop="prop2" label="主题" />
        <el-table-column prop="prop3" label="作者" />
        <el-table-column prop="prop4" label="关键词" />
        <el-table-column prop="prop5" label="标签">
          <template #default="scope">
            <el-tag type="warning">
              {{ scope.row.prop5 }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="收藏">
          <template #default="scope">
            <SvgIcon
              @click="scope.row.isSc = !scope.row.isSc"
              style="cursor: pointer"
              :name="scope.row.isSc ? 'sc-fulled' : 'sc-empty'"
            ></SvgIcon>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="299">
          <template #default="scope">
            <el-button type="primary" text @click="handleDialog('标签修改')">标签修改</el-button>
            <el-button @click="handleDialog('原文')" text type="warning"> 原文 </el-button>
            <el-button @click="handleDialog('关系图谱')" text type="success"> 关系图谱 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination
      :total="_t.table_conf.total"
      v-model:page.sync="_t.table_conf.page"
      v-model:pageSize.sync="_t.table_conf.pageSize"
    ></Pagination>
    <!--NOTE(@date:2023-12-14 11:56:36 谭人杰): 弹窗-->
    <el-dialog
      @opened="handleDialogOpened"
      v-model="_t.dialog_conf.visiable"
      :title="_t.dialog_conf.title"
      :destroy-on-close="_t.dialog_conf.isDestory"
      :draggable="_t.dialog_conf.draggable"
      :close-on-click-modal="_t.dialog_conf.closeOnClickModal"
      :width="['原文', '翻译', '关系图谱'].some((e) => e == _t.dialog_conf.title) ? '1100px' : '600px'"
    >
      <el-form label-width="120" inline v-if="_t.dialog_conf.title == '情报上传'">
        <el-form-item class="must-fill" label="标签">
          <el-select clearable></el-select>
        </el-form-item>
        <el-form-item class="must-fill" label="是否需要解压">
          <el-radio-group>
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="must-fill" label="资料上传">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-form v-else-if="_t.dialog_conf.title == '标签修改'">
        <el-form-item class="must-fill" label="标签">
          <el-select clearable></el-select>
        </el-form-item>
      </el-form>
      <el-row v-else-if="_t.dialog_conf.title == '原文' || _t.dialog_conf.title == '翻译'" :gutter="49">
        <el-col style="display: flex; justify-content: flex-end">
          <el-dropdown trigger="click" @command="handleCommand">
            <el-button text type="warning">
              翻译<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in _t.opt_conf.lan_opt" :command="item.value">
                  {{ item.value }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
        <el-col :span="_t.dialog_conf.title == '翻译' ? 12 : 24">
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
        <el-col v-if="_t.dialog_conf.title == '翻译'" :span="12">
          <div class="fy_title">
            <span style="--un-animation-delay: 0.6s" class="animate-jump">
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
      <el-row style="height: 80vh" v-else-if="_t.dialog_conf.title == '关系图谱'">
        <RelationGraph
          ref="$relationGraph"
          :options="_t.opt_conf.graphOptions"
          :on-node-click="onNodeClick"
          :on-line-click="onLineClick"
        />
      </el-row>
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
import RelationGraph from "relation-graph/vue3"
import { getRandomChineseWord, getRandomString, lan_opt } from "@/utils/mock-data/index.js"
import { reactive, onMounted, ref, nextTick } from "vue"
import TypeWriter from "@/components/TypeWriter/index.vue"
const $relationGraph = ref<RelationGraph>(null)
const _t = reactive({
  flt: {
    text: ""
  },
  opt_conf: {
    lan_opt: lan_opt?.[0]?.children ?? [],
    graphOptions: {
      allowSwitchLineShape: true,
      allowSwitchJunctionPoint: true,
      defaultJunctionPoint: "border"
    }
  },
  table_conf: {
    data: [],
    total: 100,
    page: 1,
    pageSize: 10
  },
  dialog_conf: {
    visiable: false,
    title: "",
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

const handleDialog = (title) => {
  _t.dialog_conf.visiable = true
  _t.dialog_conf.title = title
}

const handleCommand = (v) => {
  _t.dialog_conf.title = "翻译"
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

const handleDialogOpened = () => {
  //需要指定 节点参数和连接线的参数
  var __graph_json_data = {
    rootId: "a",
    nodes: [
      // node配置选项：http://relation-graph.com/#/docs/node
      // node支持通过插槽slot完全自定义，示例：http://relation-graph.com/#/demo/adv-slot
      { id: "a", text: "甲方1", borderColor: "yellow" },
      { id: "b", text: "甲方2", color: "#43a2f1", fontColor: "yellow" },
      { id: "c", text: "甲方3", nodeShape: 1, width: 80, height: 60 },
      { id: "e", text: "甲方4", nodeShape: 0, width: 150, height: 150 }
    ],
    lines: [
      // link配置选项：http://relation-graph.com/#/docs/link
      { from: "a", to: "b", text: "关系1", color: "#43a2f1" },
      { from: "a", to: "c", text: "关系2" },
      { from: "a", to: "e", text: "关系3" },
      { from: "b", to: "e", color: "#67C23A" }
    ]
  }
  nextTick(() => {
    $relationGraph.value.setJsonData(__graph_json_data)
  })
}

const onNodeClick = (nodeObject, $event) => {
  console.log("onNodeClick:", nodeObject)
}
const onLineClick = (linkObject, $event) => {
  console.log("onLineClick:", linkObject)
}

onMounted(() => {
  _t.table_conf.data = Array.from({ length: 10 }).map((item) => ({
    isSc: false,
    prop1: getRandomChineseWord(8),
    prop2: getRandomChineseWord(3),
    prop3: getRandomChineseWord(3),
    prop4: getRandomChineseWord(6),
    prop5: getRandomChineseWord(3)
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
