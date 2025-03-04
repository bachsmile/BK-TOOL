<template>
  <el-dialog :model-value="visible" title="Xem trước" @close="close">
    <el-space
      fill
      wrap
      :fill-ratio="30"
      direction="horizontal"
      style="width: 100%"
    >
      <canvas class="w-100" id="myCanvas" width="525" height="686"></canvas>
    </el-space>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="close"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import OrinBefore from "@/assets/img/OrinBefore.png";
import Slide4 from "@/assets/img/bg-shirt.jpg";

import { nextTick, watch } from "vue";

interface Props {
  visible: boolean;
  data: any;
}

const props = withDefaults(defineProps<Props>(), {});

interface Emits {
  (e: "update:visible", val: boolean): void;
}

const emit = defineEmits<Emits>();

function close() {
  emit("update:visible", false);
}

function draw() {
  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  const ctx = canvas?.getContext("2d");

  if (!canvas || !ctx) {
    console.error("Canvas element or 2D context not found");
    return;
  }

  // Lấy hình ảnh nền
  const bgImage = new Image();
  bgImage.src = OrinBefore;
  bgImage.onload = function () {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    // Tải hình ảnh làm màu chữ
    const patternImage = new Image();
    patternImage.src = Slide4;
    patternImage.onload = function () {
      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = 300;
      patternCanvas.height = 200;
      const patternCtx = patternCanvas.getContext("2d");
      if (patternCtx) {
        patternCtx.drawImage(
          patternImage,
          0,
          0,
          patternCanvas.width,
          patternCanvas.height
        );

        // Tạo pattern từ canvas tạm
        const pattern = ctx.createPattern(patternCanvas, "no-repeat");

        if (pattern) {
          // Thiết lập thuộc tính văn bản
          ctx.font = "900 60px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // Vẽ văn bản với màu đen để tạo mask
          ctx.save();
          ctx.fillStyle = "black";
          const x = canvas.width / 2;
          const y = 250;
          ctx.fillText("Hello World", x, y);
          // Tạo vùng clip cho văn bản
          ctx.clip();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // Áp dụng pattern làm màu cho chữ
          // ctx.globalCompositeOperation = "source-in";
          ctx.fillStyle = pattern;
          ctx.fillText("Hello World", x, y);

          // Khôi phục trạng thái canvas
          ctx.restore();
        } else {
          console.error("Failed to create pattern");
        }
      } else {
        console.error("Failed to get context for patternCanvas");
      }
    };

    patternImage.onerror = function () {
      console.error("Failed to load pattern image");
    };
  };

  bgImage.onerror = function () {
    console.error("Failed to load background image");
  };
}

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        draw();
      });
    }
  }
);
</script>

<style scoped></style>
