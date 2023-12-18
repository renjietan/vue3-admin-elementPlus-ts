<template>
  <div class="container-right-action">
    <el-input @keyup.enter="handleEnter" v-model="_t.cur_chat_text" clearable>
      <template #prepend>
        <el-upload
          ref="upload"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
        >
          <!-- <el-button icon="plus" size="large" type="primary"></el-button> -->
        </el-upload>
      </template>
      <template #append>
        <el-button type="primary" icon="position"></el-button>
      </template>
    </el-input>
    <el-dialog
      v-model="_t.dialog_conf.visiable"
      :title="_t.dialog_conf.title"
      :destroy-on-close="_t.dialog_conf.isDestory"
      :draggable="_t.dialog_conf.draggable"
      :close-on-click-modal="_t.dialog_conf.closeOnClickModal"
      width="1100"
    >
      <el-upload :before-upload="handleUpload" class="upload-demo" drag>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖动文件到这里或者<em>点击上传</em></div>
        <!-- <template #tip>
        <div class="el-upload__tip">jpg/png</div>
      </template> -->
      </el-upload>
      <el-row :gutter="49" v-if="!!_t.form_data.text">
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
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="_t.dialog_conf.visiable = false">取消</el-button>
          <el-button type="primary" @click="_t.dialog_conf.visiable = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <Teleport to="body">
      <div @click="_t.drawer_conf.visiable = true" class="settings">
        <el-icon color="white" size="20"><Setting /></el-icon>
      </div>
    </Teleport>
    <el-drawer v-model="_t.drawer_conf.visiable" :title="_t.drawer_conf.title" :direction="_t.drawer_conf.direction">
      <el-divider content-position="left">Prompt配置</el-divider>
      <el-row>
        <el-col class="drawer-list" v-for="item in 3">
          <div class="drawer-list-item">
            <el-checkbox :label="`prompt配置${item}`" size="large" />
          </div>
        </el-col>
      </el-row>
      <el-divider
        style="cursor: pointer"
        @click="_t.drawer_conf.isSpread = !_t.drawer_conf.isSpread"
        content-position="left"
        >新增Prompt临时配置<el-icon style="margin-left: 10px"><ArrowDown /></el-icon
      ></el-divider>
      <div v-if="_t.drawer_conf.isSpread">
        <el-form>
          <el-form-item v-for="(item, index) in _t.drawer_conf.list" label="内容">
            <div style="display: flex; align-items: center">
              <el-input />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import TypeWriter from "@/components/TypeWriter/index.vue"
import { reactive, ref, defineEmits, defineProps } from "vue"
import { getRandomChineseWord, getRandomString, lan_opt } from "@/utils/mock-data/index.ts"
import Bus from "@/utils/bus.ts"

const _t = reactive({
  cur_chat_text: "",
  lan: "",
  drawer_conf: {
    title: "配置",
    visiable: false,
    direction: "rtl",
    isSpread: false,
    list: [{}]
  },
  dialog_conf: {
    visiable: false,
    title: "翻译",
    isDestory: false, //关闭前销毁
    draggable: true, //拖拽
    closeOnClickModal: false
  },
  form_data: {
    text: "",
    old_text: "",
    right_title: "",
    left_title: ""
  },
  opt_conf: {
    lan_opt
  }
})

const chatList = ref(null)

const handleUpload = () => {
  _t.form_data.text = getRandomChineseWord(100)
  _t.form_data.old_text = getRandomString(400)
}
const handleCascader = (v) => {
  _t.dialog_conf.visiable = true
}

const handleEnter = (e) => {
  Bus.emit("enter-text", _t.cur_chat_text)
  _t.cur_chat_text = ""
}
</script>

<style scoped lang="scss">
.drawer-list {
  margin-bottom: 10px;
  .drawer-list-item {
    padding: 0 15px;
    background: var(--el-fill-color);
  }
}

.settings {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: var(--el-color-primary);
  position: fixed;
  right: 0;
  top: 50%;
  margin-top: -100px;
  cursor: pointer;
}
.container-right-action {
  height: 40px;
  display: flex;
  align-items: flex-end;
}
</style>
