<template>
  <div>
    <el-dialog v-model="centerDialogVisible" title="Môn học" width="80%" center>
      <div>
        <el-checkbox-group v-model="selected">
          <el-row class="over-auto">
            <el-col v-for="item in subject" :key="item.key" class="p-x-2" :span="6">
              <el-checkbox :label="item.key" :value="item.value" />
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close">Làm mới</el-button>
          <el-button type="primary" @click="submitForm">
            Thêm mới
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { SUBJECT } from "@/typescript/constants/data";
import { ref, watch } from "vue";

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

const selected = ref([]);
const subject = ref(SUBJECT);
const centerDialogVisible = ref(false);

const submitForm = () => {
  emit("update:isShow", false);
};

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
