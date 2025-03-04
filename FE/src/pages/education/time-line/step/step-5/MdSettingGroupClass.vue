<template>
  <div>
    <el-dialog v-model="centerDialogVisible" title="Tùy chỉnh" width="500" center @close="close">
      <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="Số Tiết Tối thiểu trong một buổi" prop="minLessons">
          <el-select-v2 v-model="ruleForm.minLessons" placeholder="Không giới hạn" :options="optionsNumber(10)" />
        </el-form-item>
        <el-form-item label="Số Tiết Tối đa trong một buổi" prop="maxLessons">
          <el-select-v2 v-model="ruleForm.maxLessons" placeholder="Không giới hạn" :options="optionsNumber(10)" />
        </el-form-item>
        <el-form-item label="Số Buổi Tối thiểu trong một ngày" prop="minSessions">
          <el-select-v2 v-model="ruleForm.minSessions" placeholder="Không giới hạn" :options="optionsNumber(2)" />
        </el-form-item>
        <el-form-item label="Số Buổi Tối đa trong một ngày" prop="maxSessions">
          <el-select-v2 v-model="ruleForm.maxSessions" placeholder="Không giới hạn" :options="optionsNumber(2)" />
        </el-form-item>
        <el-form-item label="Số Ngày Tối thiểu trong một tuần" prop="minDays">
          <el-select-v2 v-model="ruleForm.minDays" placeholder="Không giới hạn" :options="optionsNumber(7)" />
        </el-form-item>
        <el-form-item label="Số Ngày Tối đa trong một tuần" prop="maxDays">
          <el-select-v2 v-model="ruleForm.maxDays" placeholder="Không giới hạn" :options="optionsNumber(7)" />
        </el-form-item>
        <el-form-item label="Môn dạy" prop="subjectName">
          <el-input v-model="ruleForm.subjectName" placeholder="Nhập tên môn" />
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
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { reactive, ref, watch } from "vue";

interface Props {
  isShow?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isShow: false,
});

interface Emit {
  (e: "update:isShow", isShow: boolean): void;
}
const emit = defineEmits<Emit>();

interface RuleForm {
  minLessons: number | null;
  maxLessons: number | null;
  minSessions: number | null;
  maxSessions: number | null;
  minDays: number | null;
  maxDays: number | null;
  subjectName: string;
}
const ruleForm = reactive<RuleForm>({
  minLessons: null,
  maxLessons: null,
  minSessions: null,
  maxSessions: null,
  minDays: null,
  maxDays: null,
  subjectName: "",
});

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();

const centerDialogVisible = ref(false);
const rules = reactive<FormRules<RuleForm>>({
  subjectName: [
    { required: true, message: "Vui lòng nhập dữ liệu", trigger: "blur" },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const optionsNumber = (length: number) =>
  Array.from({ length }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
  }));

const close = () => {
  emit("update:isShow", false);
};

watch(
  () => props.isShow,
  (val) => {
    centerDialogVisible.value = val;
  },
  { immediate: true }
);
</script>

<style scoped></style>
