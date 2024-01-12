<template>
  <canvas class="canvas" ref="canEl"></canvas>
</template>

<script setup>
import { ref, onMounted, defineExpose } from "vue";
import { setupCanvas } from "@/utils";
import Confetto from "@/utils/confetto";
import { randomNum } from "../utils";

const canEl = ref(null);
const COUNT = 80;

let confetti = [];
let canvas = null;
let ctx = null;

function drawConfetti(confetti) {
  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    confetto.update();

    ctx.fillStyle =
      confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
    ctx.fillRect(-width / 2, -height / 2, width, height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (confetto.position.y >= canvas.height) {
      confetti.splice(index, 1);
    }
  });
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConfetti(confetti);
  window.requestAnimationFrame(render);
}

function play() {
  // confetti.length = 0;
  for (let i = 0; i < COUNT; i++) {
    confetti.push(new Confetto(randomNum(0, canvas.width), randomNum(0, 100)));
  }
}

onMounted(() => {
  canvas = canEl.value;
  ctx = setupCanvas(canvas);
  render();
});

defineExpose({ play });
</script>

<style lang="scss" scoped>
.canvas {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 999999;
  pointer-events: none;
}
</style>
