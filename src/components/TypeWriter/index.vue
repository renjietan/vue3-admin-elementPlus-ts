<template>
  <div :style="{ width: width, height: height }" class="textBox">
    <!-- 光标 -->
    <div class="cursor" :class="{ 'cursor-active': classComputed }" :style="styleComputed"></div>
    <div class="text">
      {{ newText }}
      <!-- 光标跟随span元素 -->
      <span ref="getSpanElementNode"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed, defineProps, watch, onUnmounted, defineEmits } from "vue"
const props = defineProps({
  text: {
    type: String,
    default: ""
  },
  width: {
    type: String,
    default: "100%"
  },
  height: {
    type: String,
    default: "100px"
  }
})

const $emit = defineEmits(['writing'])
//文本数据
let text = ""
//展示数据
const newText = ref<string>("")
//获取span元素
const getSpanElementNode = ref<any>(null)
//光标位置数据类型
type cursorPositionDataType = {
  x: number
  y: number
}
//定时器
let timer: any

//光标位置
const cursorPosition = reactive<cursorPositionDataType>({
  x: 0,
  y: 0
})

//class样式是否添加计算
const classComputed = computed((): boolean => {
  return newText.value.length === text.length
})

//光标位置样式计算
const styleComputed = computed((): any => {
  return { transform: `translate(${cursorPosition.x}px,${cursorPosition.y}px)` }
})
watch(
  () => props.text,
  (n) => {
    if (timer != null) {
      newText.value = ''
      clearInterval(timer)
      timer = null
    }
    text = props.text
    fn(140)
  }
)
onMounted(() => {
  text = props.text
  fn(140)
})
onUnmounted(() => {
  if (timer != null) {
    clearInterval(timer)
    timer = null
  }
})

//打字机
const fn = (time: number) => {
  //计数器
  let counter: number = 0

  //打字机效果函数
  const typeWriter = () => {
    //计数器大于字符串长度视为结束
    if (counter > text.length - 1) {
      //清除定时器
      clearInterval(timer)
      return
    }
    //拼接字符串
    newText.value += text[counter]
    //计数器+1
    counter++
    //调用获取元素位置函数
    getElementLocation()
  }
  //定时执行函数
  timer = setInterval(typeWriter, time)
}

//获取元素位置作为光标移动的位置
const getElementLocation = () => {
  if (getSpanElementNode.value !== null) {
    cursorPosition.x = getSpanElementNode.value.offsetLeft + 20
    cursorPosition.y = getSpanElementNode.value.offsetTop + 1
  }
}
</script>

<style scoped lang="scss">
@keyframes flicker {
  0% {
    opacity: 0;
  }

  25% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.textBox {
  position: relative;
  overflow: hidden;
  background-color: #fff;

  .cursor {
    position: absolute;
    width: 2px;
    height: 20px;
    background-color: #000;
  }

  .cursor-active {
    animation: flicker 1s infinite;
  }

  .text {
    margin: 10px;
  }
}
</style>
