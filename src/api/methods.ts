/**
 * 合并对象属性到target上
 * @param target 目标对象
 * @param other 其他对象
 */
export function merge(target: { [x: string]: any }, ...other: any[]) {
  for (let i = 0, j = other.length; i < j; i++) {
    const source = other[i] || {}
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        const value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }
  return target
}
