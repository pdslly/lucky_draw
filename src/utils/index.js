/**
 * 取范围内随机整数
 * @param {number} minNum
 * @param {number} maxNum
 */
export function randomNum(minNum = 1, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}
