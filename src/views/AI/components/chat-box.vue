<template>
  <div class="container-right-chat" ref="chatList">
    <div style="display: flex; justify-content: flex-end">
      <el-dropdown>
        <el-icon style="font-size: 30px; color: var(--el-color-primary); float: right"><UploadFilled /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>下载为doc</el-dropdown-item>
            <el-dropdown-item>下载为pdf</el-dropdown-item>
            <el-dropdown-item>下载为txt</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
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
            <TypeWriter
              style="background-color: transparent; margin: 10px"
              :text="item.text"
              height="100%"
            ></TypeWriter>
          </div>
          <div @click="item.isMore = !item.isMore" class="container-right-chat-item-content-label2-from">
            <span>情报资料出处</span>
            <el-icon style="margin-left: 4px"><ArrowDown /></el-icon>
          </div>
          <div style="clear: both"></div>
          <div class="container-right-chat-item-content-label2" style="background-color: #fff" v-if="item.isMore">
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
                  <el-link @click="handleDialog" style="margin-top: 13px" type="primary">查看原文</el-link>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TypeWriter from "@/components/TypeWriter/index.vue"
import { ref, reactive, defineEmits, defineProps } from "vue"
import { getRandomChineseWord, getRandomString, lan_opt } from "@/utils/mock-data/index.ts"
import Bus from "@/utils/bus.ts"
const _t = reactive({
  cur_chat_list: []
})
const _props = defineProps({})
Bus.on("enter-text", (v) => {
  _t.cur_chat_list.push({
    issuer: 1, // 1、用户 2、机器人
    text: v
  })
  // chatList._rawValue.scrollTop = chatList._rawValue.scrollHeight
  _t.cur_chat_list.push({
    issuer: 2, // 1、用户 2、机器人
    isMore: false,
    text: getRandomChineseWord(200),
    from_text: Array.from({ length: 5 }).map((item) => ({
      title: getRandomChineseWord(20) + ".txt",
      content: getRandomChineseWord(340),
      path: "/user/DeskTop/files/" + getRandomChineseWord(20) + ".txt"
    }))
  })
})
</script>

<style scoped lang="scss">
@import "@/styles/mixins.scss";
.container-right-chat {
  height: 100%;
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
        line-height: 24px;
        margin-top: 5px;
        padding-left: 8px;
      }

      &-label2 {
        width: 100%;
        background: rgb(240, 244, 250);
        /* padding: 10px; */
        line-height: 24px;
        color: rgb(112, 129, 164);

        &-from {
          text-align: right;
          margin: 10px 20px 20px 0;
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
</style>
