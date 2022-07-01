// 为了方便项目中使用本地存储写的时候，简化操作：封装，获取，设置，删除，全部删除工具函数
// 获取
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}
// 设置
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
// 删除
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
export function clearItem () {
  window.localStorage.clearItem()
}
