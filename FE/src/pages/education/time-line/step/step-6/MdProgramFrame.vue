<template>
  <div>
    <el-dialog v-model="isShowCondition" @close="close" title="Cài đặt khung chương trình" width="80%" center>
      <div>
        <CmTableTimeLineFrame></CmTableTimeLineFrame>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close">Đóng</el-button>
          <el-button type="primary" @click="submitForm">
            Xác nhận
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import CmTableTimeLineFrame from '@/components/supports/CmTableTimeLineFrame.vue';
import { ref, watch } from 'vue';

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
const isShowCondition = ref(false);
const submitForm = () => {
  emit("update:isShow", false);
};
const close = () => {
  emit("update:isShow", false);
};
watch(
  () => props.isShow,
  (val) => {
    isShowCondition.value = val;
  },
  { immediate: true }
);

</script>

<style scoped></style>