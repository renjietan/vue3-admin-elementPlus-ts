<template>
  <div class="container-left">
    <el-button
      @click="handlePush"
      style="width: 100%; margin-bottom: 25px"
      type="primary"
      icon="Plus"
      plain
      size="mini"
    >
      new chat
    </el-button>
    <div
      @click="handleSwitch(item)"
      v-for="(item, index) in _t.list"
      :class="[item.id == _t.curChat ? 'container-left-item-active' : '', 'container-left-item']"
    >
      <span>{{ item.name }}</span>
      <el-icon @click.top="(e) => handleEdit(e, index)" class="container-left-item-edit"><EditPen /></el-icon>
      <el-icon @click.top="(e) => handleDel(e, index)" class="container-left-item-del"><Delete /></el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineEmits, defineProps } from "vue"
import { ElMessageBox, ElMessage } from "element-plus"

const _t = reactive({
  list: [],
  curChat: undefined
})

const $emit = defineEmits(["change"])

const handleSwitch = (item) => {
  _t.curChat = item.id
  $emit("change", item)
}

const handlePush = () => {
  _t.list.push({
    id: Date.now(),
    name: `chat ${new Date().getTime()}`
  })
}

const handleEdit = (e, index) => {
  e.stopPropagation()
  ElMessageBox.prompt("请输入名称", "名称修改", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputValidator: (v) => !!v
  }).then(({ value }) => {
    _t.list[index].name = value
    ElMessage({
      type: "success",
      message: `操作成功`
    })
  })
}

const handleDel = (e, index) => {
  e.stopPropagation()
  ElMessageBox.confirm("确认删除？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true
  }).then(() => {
    _t.list = _t.list.filter((item, i) => i != index)
    ElMessage({
      type: "success",
      message: "删除成功"
    })
  })
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.container-left {
  width: 300px;
  min-width: 300px;
  height: 100%;
  background: white;
  padding: 15px 10px;
  overflow-y: scroll;
  @extend %noScrollbar;
  &-item {
    max-height: 80px;
    cursor: pointer;
    margin-bottom: 15px;
    overflow: hidden;
    word-wrap: break-word;
    padding: 15px;
    border: 1px solid var(--el-border-color);
    box-sizing: border-box;
    position: relative;
    &-del {
      position: absolute;
      right: 2px;
      top: 2px;
      color: red;
    }
    &-edit {
      position: absolute;
      right: 22px;
      top: 2px;
      color: var(--el-color-primary);
    }
    &-active {
      background: var(--el-color-primary);
      color: white;
      .container-left-item-edit,
      .container-left-item-del {
        color: white;
      }
    }
    &:hover {
      background: var(--el-color-primary-light-5);
      color: white;
      .container-left-item-del {
        color: white;
      }
      .container-left-item-edit {
        color: white;
      }
    }
  }
}
</style>
