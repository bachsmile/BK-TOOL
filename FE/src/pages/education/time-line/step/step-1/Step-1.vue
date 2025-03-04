<template>
  <div class="flex-center">
    <el-form ref="ruleFormRef" style="width: 100%; max-width: 900px;" :model="ruleForm" :rules="rules"
      label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
      <el-row>
        <el-col class="p-x-2" :span="12">
          <el-form-item label="Tên thời khóa biểu" prop="name">
            <el-input v-model="ruleForm.name" placeholder="Nhập tên thời khóa biểu" />
          </el-form-item>
        </el-col>
        <el-col class="p-x-2" :span="12">
          <el-form-item label="Tên trường" prop="school">
            <el-input v-model="ruleForm.school" placeholder="Nhập tên trường" />
          </el-form-item>
        </el-col>
        <el-col class="p-x-2" :span="12">
          <el-form-item label="Số ngày trong tuần" prop="countDay" required>
            <el-select-v2 v-model="ruleForm.countDay" placeholder="Số ngày trong tuần" :options="optionsNumber(7)" />
          </el-form-item>
        </el-col>
        <el-col class="p-x-2" :span="12">
          <el-form-item label="Số buổi trong ngày" prop="countSessions" required>
            <el-select-v2 v-model="ruleForm.countSessions" placeholder="Số buổi trong ngày"
              :options="optionsNumber(2)" />
          </el-form-item>
        </el-col>
        <el-col class="p-x-2" :span="12">
          <el-form-item label="Số tiết trong buổi" prop="countLessons" required>
            <el-select-v2 v-model="ruleForm.countLessons" placeholder="Số buổi trong ngày"
              :options="optionsNumber(10)" />
          </el-form-item>
        </el-col>
        <el-col class="p-x-2" :span="12">
          <el-form-item label="Năm học" prop="year">
            <el-date-picker v-model="ruleForm.year" type="year" placeholder="Chọn năm học" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col class="p-x-2" :span="24">
          <el-form-item label="Mô tả" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <div class="flex-center">
    <div class="my-5">
      <CmTableTimeLine :table="tableData"></CmTableTimeLine>
    </div>
  </div>
  <CmFooterContainer></CmFooterContainer>
</template>

<script lang="ts" setup>
import CmFooterContainer from '@/components/supports/CmFooterContainer.vue';
import CmTableTimeLine from '@/components/supports/CmTableTimeLine.vue';
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { ref } from 'vue';
import { reactive } from 'vue'
const tableData = [
  [
    "Sáng",
    "Tiết 1",
    [1, true, ''],
    [11, true, ''],
    [21, true, ''],
    [31, true, ''],
    [41, true, ''],
    [51, true, ''],
  ],
  [
    "Sáng",
    "Tiết 2",
    [2, true, ''],
    [12, true, ''],
    [22, true, ''],
    [32, true, ''],
    [42, true, ''],
    [52, true, ''],
  ],
  [
    "Sáng",
    "Tiết 3",
    [3, true, ''],
    [13, true, ''],
    [23, true, ''],
    [33, true, ''],
    [43, true, ''],
    [53, true, ''],
  ],
  [
    "Sáng",
    "Tiết 4",
    [4, true, ''],
    [14, true, ''],
    [24, true, ''],
    [34, true, ''],
    [44, true, ''],
    [54, true, ''],
  ],
  [
    "Sáng",
    "Tiết 5",
    [5, true, ''],
    [15, true, ''],
    [25, true, ''],
    [35, true, ''],
    [45, true, ''],
    [55, true, ''],
  ],
  [
    "Chiều",
    "Tiết 1",
    [6, true, ''],
    [16, true, ''],
    [26, true, ''],
    [36, true, ''],
    [46, true, ''],
    [56, true, ''],
  ],
  [
    "Chiều",
    "Tiết 2",
    [7, true, ''],
    [17, true, ''],
    [27, true, ''],
    [37, true, ''],
    [47, true, ''],
    [57, true, ''],
  ],
  [
    "Chiều",
    "Tiết 3",
    [8, true, ''],
    [18, true, ''],
    [28, true, ''],
    [38, true, ''],
    [48, true, ''],
    [58, true, ''],
  ],
  [
    "Chiều",
    "Tiết 4",
    [9, true, ''],
    [19, true, ''],
    [29, true, ''],
    [39, true, ''],
    [49, true, ''],
    [59, true, ''],
  ],
  [
    "Chiều",
    "Tiết 5",
    [10, true, ''],
    [20, true, ''],
    [30, true, ''],
    [40, true, ''],
    [50, true, ''],
    [60, true, ''],
  ],
];
const formSize = ref<ComponentSize>('default')

interface RuleForm {
  name: string
  school: string
  countDay: number
  countSessions: number
  countLessons: number
  year: string
  desc: string
}
const ruleForm = reactive<RuleForm>({
  name: '',
  school: '',
  countDay: 6,
  countSessions: 2,
  countLessons: 5,
  year: new Date().getFullYear().toString(),
  desc: '',
})
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Vui lòng nhập dữ liệu', trigger: 'blur' },
    { min: 3, max: 255, message: 'Chiều dài phải là 3 đến 255', trigger: 'blur' },
  ],
  school: [],
  countDay: [
    {
      required: true,
      message: 'Vui lòng chọn dữ liệu',
      trigger: 'change',
    },
  ],
  countSessions: [
    {
      required: true,
      message: 'Vui lòng chọn dữ liệu',
      trigger: 'change',
    },
  ],
  countLessons: [
    {
      required: true,
      message: 'Vui lòng chọn dữ liệu',
      trigger: 'change',
    },
  ],
  year: [
    {
      type: 'date',
      required: true,
      message: 'Vui lòng chọn một năm',
      trigger: 'change',
    },
  ],
  desc: [
    { required: false, message: 'Please input activity form', trigger: 'blur' },
  ],
})
const optionsNumber = (length: number) => Array.from({ length }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 300px;
}

.demo-form-inline .el-select {
  --el-select-width: 300px;
}
</style>
