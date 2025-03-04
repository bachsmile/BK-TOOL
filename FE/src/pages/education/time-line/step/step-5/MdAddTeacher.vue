<template>
  <div>
    <el-dialog
      v-model="centerDialogVisible"
      title="Tùy chỉnh"
      width="500"
      center
      @close="close"
    >
      <CmTable
        isSelect
        :columns="columns"
        :rows="rows"
        v-model:selected="selected"
      >
        <template #row="{ col, context }">
          <div v-if="col === 'teacher'">
            {{ SUBJECT[context]?.key }}
          </div>
        </template>
      </CmTable>
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
import CmTable from "@/components/common/CmTable.vue";
import { SUBJECT } from "@/typescript/constants/data";
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

const { t } = window.i18n();
const columns = ref([
  { label: t("name"), key: "name" },
  { label: t("code"), key: "code" },
  { label: t("Bộ môn"), key: "teacher", type: "custom" },
]);
interface Setting {
  name: string;
  code: string;
  teacher: number;
}
const rows = ref<Setting[]>([
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
  {
    name: "Tom",
    code: "code",
    teacher: 1,
  },
]);
const selected = ref([rows.value[2]]);
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
