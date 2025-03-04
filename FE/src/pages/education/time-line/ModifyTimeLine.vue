<template>
  <div>
    <section>
      <div class="flex-center j-between mb-4">
        <el-button style="margin-top: 12px" @click="prev">Trước</el-button>
        <div style="width: 100%">
          <el-steps  :active="active" align-center finish-status="success">
            <el-step title="Bước 1" description="Cấu hình chung" @click="active = 0" />
            <el-step title="Bước 2" description="Môn học" @click="active = 1" />
            <el-step title="Bước 3" description="Tổ chuyên môn" @click="active = 2" />
            <el-step title="Bước 4" description="Giáo viên" @click="active = 3" />
            <el-step title="Bước 5" description="Khối (nhóm lớp)" @click="active = 4" />
            <el-step title="Bước 6" description="Lớp" @click="active = 5" />
            <el-step title="Bước 7" description="Phân công giảng dạy" @click="active = 6" />
            <el-step title="Bước 8" description="Kết quả" @click="active = 7" />
          </el-steps>
        </div>
        <el-button style="margin-top: 12px" @click="next">Sau</el-button>
      </div>

    </section>
    <section>
      <component :is="components[ active ]()"></component>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, Ref, ref } from 'vue'

const active: Ref<number> = ref(0)
const components = ref<any>({
  0: () => defineAsyncComponent(() => import('./step/step-1/Step-1.vue')),
  1: () => defineAsyncComponent(() => import('./step/step-2/Step-2.vue')),
  2: () => defineAsyncComponent(() => import('./step/step-3/Step-3.vue')),
  3: () => defineAsyncComponent(() => import('./step/step-4/Step-4.vue')),
  4: () => defineAsyncComponent(() => import('./step/step-5/Step-5.vue')),
  5: () => defineAsyncComponent(() => import('./step/step-6/Step-6.vue')),
  6: () => defineAsyncComponent(() => import('./step/step-7/Step-7.vue')),
  7: () => defineAsyncComponent(() => import('./step/step-8/Step-8.vue')),

})


const next = () => {
  if (active.value++ > 7) active.value = 0
}
const prev = () => {
  if (active.value-- < 0) active.value = 7
}
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 250px;
}

.demo-form-inline .el-select {
  --el-select-width: 250px;
}
</style>

<style scoped></style>