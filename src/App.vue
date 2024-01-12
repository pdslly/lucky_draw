<template>
  <main>
    <img
      v-if="isRuning"
      src="./assets/icon/end.png"
      @click="endLottery"
      class="btn"
    />
    <img
      v-else
      src="./assets/icon/start.png"
      @click="startLottery"
      class="btn"
    />
    <div id="tags">
      <a
        href="javascript:void(0);"
        :style="{
          color: '#fff',
        }"
        v-for="item in staffList"
        :key="item.id"
      >
        {{ item.name }}
        <img v-if="item.avatar" :src="item.avatar" :width="50" :height="50" />
      </a>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :close-on-click-modal="false"
      width="500px"
      title="选择抽奖类型"
    >
      <el-row type="flex" justify="space-around">
        <el-button
          size="large"
          type="success"
          plain
          v-for="(prize, index) in prizeList"
          :key="prize.name"
          @click="prizeBtnClick(prize, index)"
          >{{ prize.name }}</el-button
        >
      </el-row>
    </el-dialog>
    <el-dialog v-model="luckyVisible" width="500px" title="中奖名单">
      <el-row type="flex" justify="space-around">
        <div
          v-for="(user, index) in curPrize.users"
          :key="index"
          class="lucky-user"
        >
          <img :src="user.avatar" :width="100" :height="100" />
          <b>
            <span>{{ user.department }}</span
            >_<b>{{ user.name }}</b></b
          >
        </div>
      </el-row>
    </el-dialog>
    <audio class="audio" preload="auto" ref="audioEl" controls autoplay loop>
      <source :src="audioSrc" />
      你的浏览器不支持audio标签
    </audio>
    <Confetto ref="confettoEl"></Confetto>
  </main>
</template>
<script setup>
import { onMounted, ref, nextTick } from "vue";
import { staff, prize } from "@/config";
import { randomNum, setupCanvas } from "@/utils";
import TagCanavs from "@/assets/js/tagCanvas.js";
import Confetto from "@/components/confetto.vue";

import Bgmp3 from "@/assets/bg.mp3";
import Beginmp3 from "@/assets/begin.mp3";

let canEl = null;

const curPrize = ref(null);
const isRuning = ref(false);
const dialogVisible = ref(false);
const luckyVisible = ref(false);
const staffList = ref(staff);
const prizeList = ref(prize);
const drawnList = ref([]);
const confettoEl = ref(null);
const audioEl = ref(null);
const audioSrc = ref("");

function speed() {
  return [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)];
}

function createTagCanvas() {
  canEl = document.createElement("canvas");
  setupCanvas(canEl);
  canEl.id = "rootcanvas";
  document.body.appendChild(canEl);
}

function reloadTagCanvas() {
  document.body.removeChild(canEl);
  startTagCanvas();
}

function startTagCanvas() {
  createTagCanvas();
  TagCanavs.Start("rootcanvas", "tags", {
    textColour: null,
    initial: speed(),
    dragControl: 1,
    textHeight: 20,
    noSelect: true,
    lock: "xy",
    altImage: true,
    imageMode: "both",
    wheelZoom: false,
    zoom: "0.8",
  });
}

function startLottery() {
  dialogVisible.value = true;
}

function playAudio(mp3) {
  audioSrc.value = mp3;
  audioEl.value.load();
  setTimeout(() => {
    audioEl.value.play();
  });
}

function endLottery() {
  const { limit, users } = curPrize.value;
  TagCanavs.SetSpeed("rootcanvas", speed());
  isRuning.value = false;

  for (let i = 0; i < limit; i++) {
    let ind = randomNum(0, staffList.value.length - 1);
    let user = staffList.value.splice(ind, 1);
    users.push(...user);
  }

  nextTick(() => {
    luckyVisible.value = true;
    TagCanvas.Reload("rootcanvas");
    playAudio(Bgmp3);
    confettoEl.value.play();
  });
}

function prizeBtnClick(prize, index) {
  dialogVisible.value = false;
  prizeList.value.splice(index, 1);
  drawnList.value.push(prize);
  curPrize.value = prize;

  playAudio(Beginmp3);

  TagCanavs.SetSpeed("rootcanvas", [4, 1]);
  isRuning.value = true;
}

window.addEventListener("resize", reloadTagCanvas);

onMounted(() => {
  startTagCanvas();
  playAudio(Bgmp3);
});
</script>
<style lang="scss" scoped>
.audio {
  position: absolute;
  top: -100%;
}
.btn {
  position: absolute;
  width: 180px;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  cursor: pointer;
}
.lucky-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
}
</style>
