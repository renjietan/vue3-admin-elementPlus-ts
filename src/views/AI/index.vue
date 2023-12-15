<template>
  <div class="container">
    <div class="container-left">
      <el-button style="width: 100%; margin-bottom: 25px" type="primary" icon="Plus" plain size="mini">
        new chat
      </el-button>
      <div @click="handleClick" v-for="item in 10" class="container-left-item">
        <span>xasdasdasdasdasdasdadasdasdasdasdasdasdasda</span>
        <el-icon @click.top="handleClick2" class="container-left-item-del"><Delete /></el-icon>
      </div>
    </div>
    <div style="width: 30px"></div>
    <div class="container-right">
      <div class="container-right-chat" ref="chatList">
        <div class="container-right-chat-item" v-for="(item, index) in _t.cur_chat_list">
          <div class="container-right-chat-item-icon">
            <SvgIcon style="font-size: 28px" :name="item.issuer == 1 ? 'user' : 'jqr'"></SvgIcon>
          </div>
          <div class="container-right-chat-item-content">
            <div class="container-right-chat-item-content-title">{{ item.issuer == 1 ? "你：" : "机器人：" }}</div>
            <div class="container-right-chat-item-content-label" v-if="item.issuer == 1">
              {{ item.text }}
            </div>
            <div class="container-right-chat-item-content-label2" v-if="item.issuer == 2">
              <div style="width: 100%">
                <TypeWriter style="background-color: transparent" :text="item.text" height="100%"></TypeWriter>
              </div>
              <!-- <span>{{ item.text }}</span> -->
              <div @click="item.isMore = !item.isMore" class="container-right-chat-item-content-label2-from">
                <span>文档出处</span>
                <el-icon style="margin-left: 4px"><ArrowDown /></el-icon>
              </div>
              <div style="clear: both"></div>
              <div
                class="container-right-chat-item-content-label2"
                style="background-color: #fff; margin-top: 20px"
                v-if="item.isMore"
              >
                <el-collapse accordion>
                  <el-collapse-item :name="i" v-for="(e, i) in item.from_text">
                    <template #title>
                      <div>
                        <span>来源{{ i + 1 }}：</span><span>{{ e.title }}</span>
                      </div>
                    </template>
                    <div>
                      {{ e.content }}
                    </div>
                    <div>
                      <el-link style="margin-top: 10px" type="primary">路径：{{ e.path }}</el-link>
                    </div>
                    <div style="text-align: right">
                      <el-link style="margin-top: 13px" type="primary">查看原文</el-link>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-right-action">
        <el-input @keyup.enter="handleEnter" v-model="_t.cur_chat_text" clearable>
          <template #prepend>
            <el-select placeholder="类型" style="width: 115px">
              <!-- <el-option label="Restaurant" value="1" /> -->
            </el-select>
          </template>
        </el-input>
        <el-cascader placeholder="辅助功能" clearable v-model="_t.lan" :options="_t.opt_conf.lan_opt" @change="handleChange" />
      </div>
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
  </div>
</template>

<script lang="ts" setup>
import TypeWriter from "@/components/TypeWriter/index.vue"
import { ElMessageBox, ElMessage } from "element-plus"
import { getRandomChineseWord, getRandomString, lan_opt } from "@/utils/mock-data/index.ts"
import { reactive, ref } from "vue"
const _t = reactive({
  cur_chat_text: "",
  cur_chat_list: [],
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
const handleClick = (e) => {}

const handleUpload = () => {
  _t.form_data.text = getRandomChineseWord(100)
  _t.form_data.old_text = getRandomString(400)
}
const handleChange = (v) => {
  _t.dialog_conf.visiable = true
}

const handleClick2 = (e) => {
  e.stopPropagation()
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

const handleEnter = (e) => {
  _t.cur_chat_list.push({
    issuer: 1, // 1、用户 2、机器人
    text: _t.cur_chat_text
  })
  _t.cur_chat_text = ""
  chatList._rawValue.scrollTop = chatList._rawValue.scrollHeight
  _t.cur_chat_list.push({
    issuer: 2, // 1、用户 2、机器人
    isMore: false,
    text: getRandomChineseWord(240),
    from_text: Array.from({ length: 5 }).map((item) => ({
      title: getRandomChineseWord(20) + ".txt",
      content: getRandomChineseWord(340),
      path: "/user/DeskTop/files/" + getRandomChineseWord(20) + ".txt"
    }))
  })
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
  &-left {
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
      padding: 7px 15px;
      border: 1px solid var(--el-border-color);
      box-sizing: border-box;
      position: relative;
      &-del {
        position: absolute;
        right: 2px;
        top: 2px;
        color: red;
      }
      &:hover {
        background: #409eff;
        color: white;
        .container-left-item-del {
          color: white;
        }
      }
    }
  }

  &-right {
    width: calc(100% - 330px);
    background: white;
    display: flex;
    flex-direction: column;

    &-chat {
      flex: 1;
      overflow-y: scroll;
      padding: 15px 10px;
      @extend %noScrollbar;
      &-item {
        display: flex;
        width: 100%;
        margin-bottom: 15px;
        &-content {
          &-title {
            font-size: 16px;
            line-height: 28px;
            margin-left: 8px;
            font-weight: bold;
          }
          &-label {
            width: 100%;
            /* white-space: pre-wrap;
            word-break: break-word;
            overflow-wrap: break-word; */
            line-height: 24px;
            margin-top: 5px;
            padding-left: 8px;
          }

          &-label2 {
            width: 100%;
            background: rgb(240, 244, 250);
            padding: 10px;
            line-height: 24px;
            color: rgb(112, 129, 164);

            &-from {
              text-align: right;
              margin-top: 10px;
              font-weight: bold;
              padding: 2px 15px;
              border: 1px solid rgba(112, 129, 164, 0.7);
              font-size: 12px;
              float: right;
              cursor: pointer;
              display: flex;
              align-items: center;
            }
          }
        }
      }
      /* container-right-chat-item-content-title */
    }
    &-action {
      height: 40px;
      display: flex;
      align-items: flex-end;
    }
  }
}
</style>
