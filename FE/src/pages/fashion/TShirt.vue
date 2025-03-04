<template>
  <div class="fh-box">
    <el-container class="layout-container-demo" style="height: 100%">
      <el-aside width="80px">
        <el-scrollbar> 123 </el-scrollbar>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div class="toolbar">
            <el-button-group>
              <el-button type="primary">Edit</el-button>
              <el-button type="primary" @click="config.isPreview = true"
                >Preview
              </el-button>
            </el-button-group>

            <el-popover
              :visible="isShowSetting"
              placement="bottom"
              :width="400"
            >
              <MdSettingTShirt
                :data="config.isBefore ? data.before : data.after"
                :config="config"
              />
              <div style="text-align: right; margin: 0">
                <el-button size="small" text @click="isShowSetting = false">
                  cancel
                </el-button>
                <el-button size="small" type="primary" @click="submitUpload">
                  confirm
                </el-button>
              </div>
              <template #reference>
                <el-button
                  class="ml-4"
                  type="primary"
                  :icon="Edit"
                  @click="isShowSetting = true"
                />
              </template>
            </el-popover>
          </div>
        </el-header>

        <el-main>
          <div v-show="config.isBefore" class="fh-view">
            <div class="fh-ds">
              <div class="fh-content-img">
                <img class="fh-img" :src="TShirtBefore" alt="" srcset="" />
                <div
                  class="fh-box-container dragBoundary"
                  @mousemove.prevent
                  ref="boxContainerRefBefore"
                >
                  <div
                    class="active fh-text"
                    :class="[
                      data.before.isFillBg ? 'fh-box-text' : 'fh-box-text-fill',
                    ]"
                    :style="{
                      transform: `translateY(${data.before.text.transformY}px)`,
                      fontSize: `${data.before.text.fontSize}px`,
                      color: data.before.isFillBg
                        ? 'transparent'
                        : data.before.text.color,
                      backgroundImage: `url(${data.before.bg.file[0].url})`,
                    }"
                    @mousedown="onMouseDown"
                  >
                    {{ data.before.text.content }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="!config.isBefore" class="fh-view">
            <div class="fh-ds">
              <div class="fh-content-img">
                <img class="fh-img" :src="TShirtAfter" alt="" srcset="" />
                <div
                  class="fh-box-container dragBoundary"
                  @mousemove.prevent
                  ref="boxContainerRefAfter"
                >
                  <div
                    class="active fh-text"
                    :class="[
                      data.after.isFillBg ? 'fh-box-text' : 'fh-box-text-fill',
                    ]"
                    :style="{
                      transform: `translateY(${data.after.text.transformY}px)`,
                      fontSize: `${data.after.text.fontSize}px`,
                      color: data.after.isFillBg
                        ? 'transparent'
                        : data.after.text.color,
                      backgroundImage: `url(${data.after.bg.file[0].url})`,
                    }"
                    @mousedown="onMouseDown"
                  >
                    {{ data.after.text.content }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-main>
        <el-footer>
          <div class="j-center">
            <el-switch
              v-model="config.isBefore"
              class="ml-2"
              inline-prompt
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              "
              active-text="Mặt trước"
              inactive-text="Mặt sau"
              size="large"
            />
          </div>
        </el-footer>
      </el-container>
    </el-container>
    <MdPreview v-model:visible="config.isPreview" :data="data" />
  </div>
</template>

<script setup lang="ts">
import TShirtAfter from "@/assets/img/TShirtAfter.jpg";
import TShirtBefore from "@/assets/img/TShirtBefore.jpg";
import { Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import shirt from "@/assets/img/bg-shirt.jpg";

import { UploadUserFile } from "element-plus";
import MdSettingTShirt from "./MdSettingTShirt.vue";
import MdPreview from "./MdPreview.vue";
const config = ref({
  heightBox: 300,
  isBefore: true,
  isPreview: false,
});

const data = ref({
  after: {
    bg: {
      file: [
        {
          name: "food.jpeg",
          url: shirt,
        },
      ] as UploadUserFile[],
      color: "",
      isBgImg: true,
    },
    text: {
      content: "WELCOME VIET NAM",
      fontSize: 60,
      transformY: 0,
      color: "#ffffff",
      fontFamily: "Arial",
    },
    isFillBg: true,
  },
  before: {
    bg: {
      file: [
        {
          name: "food.jpeg",
          url: shirt,
        },
      ] as UploadUserFile[],
      color: "",
      isBgImg: true,
    },
    text: {
      content: "WELCOME VIET NAM",
      fontSize: 60,
      transformY: 0,
      color: "#ffffff",
      fontFamily: "Arial",
    },
    isFillBg: true,
  },
});
const isShowSetting = ref(false);
let boxContainerRef = ref();
const boxContainerRefAfter = ref();
const boxContainerRefBefore = ref();
function onMouseDown(event: MouseEvent): void {
  event.preventDefault();
  boxContainerRef = config.value.isBefore
    ? boxContainerRefBefore
    : boxContainerRefAfter;
  const container = boxContainerRef.value.getBoundingClientRect();

  const element = (event.target as HTMLElement).getBoundingClientRect();
  console.log(element, container);

  const offsetX = element.left - container.left;
  const offsetY = element.top - container.top;

  console.log(`Tọa độ X: ${offsetX}, Tọa độ Y: ${offsetY}`);
  document.onmouseup = onMouseUp;
  document.onmousemove = (event) => onMouseMove(event, element);
}
function onMouseMove(event: MouseEvent, element: DOMRect): void {
  event.preventDefault();
  const container = boxContainerRef.value.getBoundingClientRect();
  console.log(boxContainerRef.value);

  const elHeight = element.height;
  const offsetMouse = event.clientY - container.top;
  console.log(offsetMouse, config.value.heightBox - elHeight / 2);
  const dataEffect = config.value.isBefore
    ? data.value.before
    : data.value.after;
  if (offsetMouse - elHeight / 2 < 0) {
    dataEffect.text.transformY = 0;
  } else if (offsetMouse > config.value.heightBox - elHeight / 2) {
    dataEffect.text.transformY = Math.round(config.value.heightBox - elHeight);
  } else {
    dataEffect.text.transformY = Math.round(offsetMouse - elHeight / 2);
  }
  console.log(data);
}
function onMouseUp(): void {
  document.onmouseup = null;
  document.onmousemove = null;
}

const submitUpload = () => {
  console.log(data.value);

  // upload.value!.submit();
};
</script>

<style>
.fh-box {
  height: calc(100vh - 1rem);
  width: 100%;
  border-radius: 4px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.12),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 1px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.fh-box .fh-view {
  height: 100%;
  width: 100%;
}

.fh-box .fh-view .fh-ds {
  border-radius: 4px;
  background-color: #dee4e4;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fh-box .fh-view .fh-ds .fh-content-img {
  height: 690x;
  width: 670px;
  position: relative;
}

.fh-box .fh-view .fh-ds .fh-content-img .fh-img {
  height: 100%;
  width: 100%;
}

.fh-box .fh-box-container {
  position: absolute;
  top: 25%;
  left: 50%;
  width: 340px;
  height: 300px;
  border: 1px dashed gray;
  transform: translate(-50%, 0);
  overflow: hidden;
}

.fh-box .fh-box-text {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-image: url(@/assets/img/bg-shirt.jpg);
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
  color: transparent;
  /* Hỗ trợ cho Chrome, Safari */
  -moz-text-fill-color: transparent;
  /* Hỗ trợ cho Firefox */
  line-height: 60px;
  font-weight: 900;
  font-size: 60px;
}

.fh-box .fh-box-text-fill {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  color: #ffffff;
  line-height: 60px;
  font-weight: 900;
  font-size: 60px;
}

.fh-box .fh-box-text.active {
  border: 1px solid rgb(5, 196, 53);
  z-index: 999;
}

.fh-box .fh-box-text.fh-text {
  font-weight: 900;
  font-size: 60px;
}

.layout-container-demo .el-header {
  position: relative;
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: #ffffff;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
