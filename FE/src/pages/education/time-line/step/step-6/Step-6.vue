<template>
  <div>
    <CmActionContainer>
      <template #action>
        <div class="action">
          <el-tooltip effect="dark" :content="t('add')" placement="top-start">
            <el-button type="primary" :icon="Plus" circle @click.prevent="openAdd" />
          </el-tooltip>
        </div>
      </template>
      <CmTable isIndex :columns="columns" :rows="rows" :selected="selected">
        <template #row="{ id, col, row }">
          <div v-if="col === 'name'">
            <el-input v-model="row[ col ]" placeholder="Nhập lớp" />
          </div>
          <div v-if="col === 'code'">
            <el-input v-model="row[ col ]" placeholder="Nhập mã" />
          </div>
          <div v-if="col === 'group'">
            <CmAutocomplete v-model="row[ col ]" :options="options" placeholder="Chọn khối lớp" />
          </div>

          <div v-if="col === 'action'" class="flex-center">
            <el-button type="primary" :icon="Setting" circle @click.prevent="settingProgram(id)" />
            <el-button type="warning" :icon="Star" circle @click.prevent="condition(id)" />
            <el-button type="danger" :icon="Delete" circle @click.prevent="deleteRow(id)" />
          </div>
        </template>
      </CmTable>
    </CmActionContainer>

    <el-button class="mt-4" style="width: 100%" @click="onAddItem">
      Add Item
    </el-button>
    <MdAddClass v-if="isShowAdd" v-model:isShow="isShowAdd"></MdAddClass>
    <MdTimeFree v-if="isShowCondition" v-model:isShow="isShowCondition"></MdTimeFree>
    <MdProgramFrame v-if="isShowSettingProgram" v-model:isShow="isShowSettingProgram"></MdProgramFrame>
  </div>
</template>

<script lang="ts" setup>
import { Star, Delete, Plus, Setting } from "@element-plus/icons-vue";
import CmTable from "@/components/common/CmTable.vue";
import { ref } from "vue";
import CmActionContainer from "@/components/supports/CmActionContainer.vue";
import CmAutocomplete from "@/components/common/CmAutocomplete.vue";
import { Option } from "@/typescript/interface";
import MdProgramFrame from "@/pages/education/time-line/step/step-6/MdProgramFrame.vue";
import MdTimeFree from "../../components/MdTimeFree.vue";
import MdAddClass from "./MdAddClass.vue";
const { t } = window.i18n();

const columns = ref([
  { label: t("Tên lớp"), key: "name", type: "custom" },
  { label: t("Mã"), key: "code", type: "custom" },
  { label: t("Khối lớp"), key: "group", type: "custom" },
  { label: t("Hành động"), key: "action", type: "custom" },
]);
interface Setting {
  name: string;
  code: string;
  group: string;
}
const isShowCondition = ref(false);
const isShowAdd = ref(false);
const rows = ref<Setting[]>([]);
const selected = ref([]);

const onAddItem = () => {
  rows.value.push({
    name: "",
    code: "",
    group: "",
  });
};
const deleteRow = (index: number) => {
  rows.value.splice(index, 1);
};
const condition = (index: number) => {
  console.log(index);
  isShowCondition.value = !isShowCondition.value;
};
const openAdd = () => {
  isShowAdd.value = !isShowAdd.value;
};

const isShowSettingProgram = ref(false);
const settingProgram = (index: number) => {
  console.log(index);
  isShowSettingProgram.value = !isShowSettingProgram.value;
};

const options: Option[] = [
  { acronym: 'K1', key: 'Khối lớp 1', value: 1 },
  { acronym: 'K2', key: 'Khối lớp 2', value: 2 },
  { acronym: 'K3', key: 'Khối lớp 3', value: 3 },
  { acronym: 'K4', key: 'Khối lớp 4', value: 4 },
  { acronym: 'K5', key: 'Khối lớp 5', value: 5 },
  { acronym: 'K6', key: 'Khối lớp 6', value: 6 },
  { acronym: 'K7', key: 'Khối lớp 7', value: 7 },
  { acronym: 'K8', key: 'Khối lớp 7', value: 8 },
  { acronym: 'K9', key: 'Khối lớp 7', value: 9 },
  { acronym: 'K10', key: 'Khối lớp 7', value: 10 },
  { acronym: 'K11', key: 'Khối lớp 7', value: 11 },
  { acronym: 'K12', key: 'Khối lớp 7', value: 12 },
]


</script>
<style></style>