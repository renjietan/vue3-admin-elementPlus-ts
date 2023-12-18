<template>
  <div class="container">
    <SessionList @change="handleSwitchTab" />
    <div style="width: 30px"></div>
    <div class="container-right">
      <el-tabs @edit="handleTabsEdit" editable v-if="Object.keys(_t.tabs).length > 0" v-model="_t.cur_tab">
        <el-tab-pane v-for="(value, key) in _t.tabs" :label="value.name" :name="value.id">
          <ChatBox></ChatBox>
        </el-tab-pane>
      </el-tabs>
      <Action></Action>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SessionList from "./components/session-list.vue"
import ChatBox from "./components/chat-box.vue"
import Action from "./components/action.vue"
import { reactive, ref } from "vue"
const _t = reactive({
  tabs: {},
  cur_tab: ""
})

const handleTabsEdit = (e) => {
  delete _t.tabs[e]
}

const handleSwitchTab = (v) => {
  _t.tabs[v.id] = v
  _t.cur_tab = v.id
}
</script>

<style scoped lang="scss">
@import "@/styles/mixins.scss";
.container {
  display: flex;
  height: 100%;
  width: 100vw;
  padding: 15px;
  overflow: hidden;
  background: white;

  &-right {
    width: calc(100% - 330px);
    background: white;
    overflow: hidden;
    :deep(.el-tabs) {
      height: calc(100% - 40px);
      .el-tabs__new-tab {
        visibility: hidden;
      }
      .el-tabs__content {
        height: calc(100% - 55px);
      }
      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>
