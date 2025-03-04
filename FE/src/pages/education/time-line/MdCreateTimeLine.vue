<template>
  <div>
    <el-dialog v-model="centerDialogVisible" title="Thêm mới" width="500" center @close="close">
      <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="Tên thời khóa biểu" prop="name">
          <el-input v-model="ruleForm.name" placeholder="Nhập tên thời khóa biểu" />
        </el-form-item>
        <el-form-item label="Tên trường" prop="school">
          <el-input v-model="ruleForm.school" placeholder="Nhập tên trường" />
        </el-form-item>
        <el-form-item label="Số ngày trong tuần" prop="countDay" required>
          <el-select-v2 v-model="ruleForm.countDay" placeholder="Số ngày trong tuần" :options="optionsNumber(7)" />
        </el-form-item>
        <el-form-item label="Số buổi trong ngày" prop="countSessions" required>
          <el-select-v2 v-model="ruleForm.countSessions" placeholder="Số buổi trong ngày" :options="optionsNumber(2)" />
        </el-form-item>
        <el-form-item label="Số tiết trong buổi" prop="countLessons" required>
          <el-select-v2 v-model="ruleForm.countLessons" placeholder="Số buổi trong ngày" :options="optionsNumber(10)" />
        </el-form-item>
        <el-form-item label="Năm học" prop="year">
          <el-date-picker v-model="ruleForm.year" type="year" placeholder="Chọn năm học" style="width: 100%" />
        </el-form-item>
        <el-form-item label="Mô tả" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="resetForm(ruleFormRef)">Làm mới</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Thêm mới
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { reactive, ref, watch } from 'vue';

interface Props {
  isShow?: boolean
}
const props = withDefaults(defineProps<Props>(), ({
  isShow: false,
}))

interface Emit {
  (e: 'update:isShow', isShow: boolean): void
}
const emit = defineEmits<Emit>()


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

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()


const centerDialogVisible = ref(false)
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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const optionsNumber = (length: number) => Array.from({ length }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

const close = () => {
  emit('update:isShow', false)
}

watch(() => props.isShow, (val) => {
  centerDialogVisible.value = val
}, { immediate: true })

</script>

<style scoped></style>