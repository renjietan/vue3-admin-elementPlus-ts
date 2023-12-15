/**
 * @description 生成随机中文
 * @author 谭人杰
 * @date 2023-12-14 15:10:48
 */

export function getRandomChineseWord(length: number): string {
  let result = ""
  for (let i = 0; i < length; i++) {
    // 简体中文字符的Unicode编码范围大致是0x4E00到0x9FFF
    const randomUnicode = Math.floor(Math.random() * (0x9fff - 0x4e00)) + 0x4e00
    result += String.fromCharCode(randomUnicode)
  }
  return result
}

/**
 * @description 生成随机英文
 * @author 谭人杰
 * @date 2023-12-14 15:10:55
 */
export function getRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

/**
 * @description 可转换的语言
 * @author 谭人杰
 * @date 2023-12-14 23:42:25
 */
export const lan_opt = [
  {
    label: "翻译",
    value: "翻译",
    children: [
      {
        label: "英译中",
        value: "英译中"
      },
      {
        label: "法译中",
        value: "法译中"
      },
      {
        label: "德译中",
        value: "德译中"
      },
      {
        label: "韩译中",
        value: "韩译中"
      },
      {
        label: "日译中",
        value: "日译中"
      },
      {
        label: "俄译中",
        value: "翻译俄译中"
      },
      {
        label: "西译中",
        value: "西译中"
      }
    ]
  }
]
