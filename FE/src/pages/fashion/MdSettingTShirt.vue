<template>
  <div>
    <section>
      <div class="j-between a-center">
        <div class="j-start a-center">
          <h3>Nền chữ</h3>
          <el-color-picker v-if="!data.bg.isBgImg" class="m-l-4" v-model="data.bg.color" show-alpha
            :predefine="predefineColors" />
        </div>
        <el-switch v-model="data.bg.isBgImg" :active-action-icon="View" :inactive-action-icon="Hide" />
      </div>
      <el-upload v-if="data.bg.isBgImg" v-model:file-list="data.bg.file" ref="upload" class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1" :on-exceed="handleExceed"
        :auto-upload="false" list-type="picture-card">
        <template #trigger>
          <el-button type="primary">select file</el-button>
        </template>
        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview">
                <el-icon><zoom-in /></el-icon>
              </span>
              <span class="el-upload-list__item-delete">
                <el-icon>
                  <Download />
                </el-icon>
              </span>
              <span class="el-upload-list__item-delete">
                <el-icon>
                  <Delete />
                </el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
    </section>
    <section>
      <div class="j-between">
        <h3>Chữ</h3>
        <el-switch v-model="data.isFillBg" :active-action-icon="View" :inactive-action-icon="Hide" />
      </div>
      <el-input v-model="data.text.content" style="width: 100%" placeholder="Please input" />
      <el-space fill wrap :fill-ratio="30" direction="horizontal" style="width: 100%">
        <template v-for="i in 4" :key="i" class="w-100 j-center">
          <div v-if="i === 1">
            <h5 class="text-center">Vị trí chữ</h5>
            <el-input-number v-model="data.text.transformY" :step="1" />
          </div>
          <div v-if="i === 2">
            <h5 class="text-center">Kích thước chữ</h5>
            <el-input-number v-model="data.text.fontSize" :step="1" />
          </div>

          <div v-if="i === 3">
            <h5 class="text-center">Kiểu chữ</h5>
            <el-autocomplete v-model="data.text.fontFamily" :fetch-suggestions="querySearchAsync"
              placeholder="Please input" @select="handleSelect">
              <template #loading>
                <el-icon class="is-loading">
                  <svg class="circular" viewBox="0 0 20 20">
                    <g class="path2 loading-path" stroke-width="0" style="animation: none; stroke: none">
                      <circle r="3.375" class="dot1" rx="0" ry="0" />
                      <circle r="3.375" class="dot2" rx="0" ry="0" />
                      <circle r="3.375" class="dot4" rx="0" ry="0" />
                      <circle r="3.375" class="dot3" rx="0" ry="0" />
                    </g>
                  </svg>
                </el-icon>
              </template>
            </el-autocomplete>
          </div>
          <div v-if="i === 4 && !data.isFillBg">
            <h5 class="text-center">Màu chữ</h5>
            <div class="j-center"><el-color-picker v-model="data.text.color" show-alpha :predefine="predefineColors" />
            </div>
          </div>

        </template>
      </el-space>

    </section>
  </div>
</template>

<script setup lang="ts">
import { UploadInstance, UploadProps, genFileId, type UploadRawFile, } from 'element-plus';
import { onMounted, ref } from 'vue';
import { Delete, Download, View, ZoomIn, Hide } from "@element-plus/icons-vue";
interface Props {
  data: any
  config: any
}
const props = withDefaults(defineProps<Props>(), {})

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const upload = ref<UploadInstance>();

const handleExceed: UploadProps[ "onExceed" ] = (files) => {
  upload.value!.clearFiles();
  const file = files[ 0 ] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

interface LinkItem {
  value: string
  link: string
}
const links = ref<LinkItem[]>([])
let timeout: ReturnType<typeof setTimeout>
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ]
}
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 1000 * Math.random())
}
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const handleSelect = (item: Record<string, any>) => {
  console.log(item)
}
onMounted(() => {
  links.value = loadAll()
})

</script>

<style scoped>
.circular {
  display: inline;
  height: 30px;
  width: 30px;
  animation: loading-rotate 2s linear infinite;
}

.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-color-primary);
  stroke-linecap: round;
}

.loading-path .dot1 {
  transform: translate(3.75px, 3.75px);
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
}

.loading-path .dot2 {
  transform: translate(calc(100% - 3.75px), 3.75px);
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 0.4s;
}

.loading-path .dot3 {
  transform: translate(3.75px, calc(100% - 3.75px));
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 1.2s;
}

.loading-path .dot4 {
  transform: translate(calc(100% - 3.75px), calc(100% - 3.75px));
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 0.8s;
}

@keyframes loading-rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}

@keyframes custom-spin-move {
  to {
    opacity: 1;
  }
}
</style>