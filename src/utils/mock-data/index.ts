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
