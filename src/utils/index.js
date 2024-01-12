/**
 * 取范围内随机整数
 * @param {number} minNum
 * @param {number} maxNum
 */
export function randomNum(minNum = 1, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum) + minNum);
}

export function setupCanvas(canvas) {
  const { innerWidth, innerHeight, devicePixelRatio } = window;
  const dpr = devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return ctx;
}
