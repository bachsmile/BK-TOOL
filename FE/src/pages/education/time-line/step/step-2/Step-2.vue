<template>
  <div>
    <CmActionContainer>
      <template #action>
        <div class="action">
          <el-tooltip effect="dark" :content="t('add')" placement="top-start">
            <el-button type="primary" :icon="Plus" circle @click="isShowSubject = !isShowSubject" />
          </el-tooltip>
        </div>
      </template>
      <CmTable isIndex :columns="columns" :rows="rows" :selected="selected">
        <template #row="{ id, col, row }">
          <div v-if="col === 'subject'">
            <el-input v-model="row[ col ]" placeholder="Nhập tên môn học" />
          </div>
          <div v-if="col === 'limit'" class="flex-center">
            <el-input-number v-model="row[ col ]" :min="1" :max="100" placeholder="Tối đa cùng diễn ra một lúc" />
          </div>
          <div v-if="col === 'consecutive'" class="flex-center">
            <el-input-number v-model="row[ col ]" :min="1" :max="10" placeholder="Liên tiếp tối đa" />
          </div>
          <div v-if="col === 'condition'" class="flex-center">
            <el-button type="warning" :icon="Star" circle @click.prevent="condition(id)" />
          </div>
          <div v-if="col === 'action'" class="flex-center">
            <el-button type="danger" :icon="Delete" circle @click.prevent="deleteRow(id)" />
          </div>
        </template>
      </CmTable>
    </CmActionContainer>

    <el-button class="mt-4" style="width: 100%" @click="onAddItem">
      Add Item
    </el-button>
    <MdTimeFree v-if="isShowCondition" v-model:isShow="isShowCondition"></MdTimeFree>
    <MdAddSubject v-if="isShowSubject" v-model:isShow="isShowSubject"></MdAddSubject>
  </div>
</template>

<script lang="ts" setup>
import { Star, Delete, Plus } from "@element-plus/icons-vue";
import CmTable from "@/components/common/CmTable.vue";
import { ref } from "vue";
import CmActionContainer from "@/components/supports/CmActionContainer.vue";
import { SUBJECT } from "@/typescript/constants/data";
import MdTimeFree from "../../components/MdTimeFree.vue";
import MdAddSubject from "./MdAddSubject.vue";
const { t } = window.i18n();

const columns = ref([
  { label: t("Tên môn"), key: "subject", type: "custom" },
  { label: t("Giới hạn"), key: "limit", type: "custom" },
  { label: t("Liên tiếp"), key: "consecutive", type: "custom" },
  { label: t("Điều kiện"), key: "condition", type: "custom", width: 90 },
  { label: t("Hành động"), key: "action", type: "custom", width: 120 },
]);
interface Setting {
  subject: string;
  limit: number;
  consecutive: number;
}
const isShowCondition = ref(false);
const isShowSubject = ref(false);
const rows = ref<Setting[]>([]);
const selected = ref([]);

const onAddItem = () => {
  rows.value.push({
    subject: "",
    limit: 1,
    consecutive: 1,
  });
};
const deleteRow = (index: number) => {
  rows.value.splice(index, 1);
};
const condition = (index: number) => {
  console.log(index);
  isShowCondition.value = !isShowCondition.value;
};
const subjectSelected = ref([]);
const subject = ref(SUBJECT);
</script>
