<template>
  <div class="container-right-action">
    <el-input @keyup.enter="handleEnter" v-model="_t.cur_chat_text" clearable>
      <template #prepend>
        <el-select placeholder="类型" style="width: 115px">
          <!-- <el-option label="Restaurant" value="1" /> -->
        </el-select>
      </template>
    </el-input>
    <el-cascader
      placeholder="辅助功能"
      clearable
      v-model="_t.lan"
      :options="_t.opt_conf.lan_opt"
      @change="handleCascader"
    />
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
  Bus.$emit('enter-text', _t.cur_chat_text)
  _t.cur_chat_text = ''
}
</script>

<style scoped lang="scss">
.container-right-action {
  height: 40px;
  display: flex;
  align-items: flex-end;
}
</style>
