<template>
  <div>
    <CmActionContainer>
      <CmTable isIndex :columns="columns" :rows="rows" :selected="selected">
        <template #row="{ id, col, row }">
          <div v-if="col === 'name'">
            <div> {{ row[ col ] }}</div>
            <div>(Tổng: 2 tiết)</div>
          </div>
          <div v-if="col === 'subject'">
            <div class="flex-center">
              <CmAutocomplete class="mx-1 my-1" v-model="row[ col ]" :options="options" placeholder="Chọn môn" />
              <CmAutocomplete class="mx-1 my-1" v-model="row[ col ]" :options="options" placeholder="Chọn khối lớp" />
            </div>
            <el-divider class="my-1" />
            <div class="flex-center">
              <CmAutocomplete class="mx-1 my-1" v-model="row[ col ]" :options="options" placeholder="Chọn môn" />
              <CmAutocomplete class="mx-1 my-1" v-model="row[ col ]" :options="options" placeholder="Chọn khối lớp" />
            </div>
          </div>
          <div v-if="col === 'action'" class="flex-center">
            <el-button type="primary" :icon="Plus" circle @click.prevent="settingProgram(id)" />
            <el-button type="danger" :icon="Delete" circle @click.prevent="deleteRow(id)" />
          </div>
        </template>
      </CmTable>
    </CmActionContainer>

  </div>
</template>

<script lang="ts" setup>
import { Star, Delete, Plus } from "@element-plus/icons-vue";
import CmTable from "@/components/common/CmTable.vue";
import { ref } from "vue";
import CmActionContainer from "@/components/supports/CmActionContainer.vue";
import CmAutocomplete from "@/components/common/CmAutocomplete.vue";
import { Option } from "@/typescript/interface";

const { t } = window.i18n();

const columns = ref([
  { label: t("Giáo viên"), key: "name", type: "custom" },
  { label: t("Môn"), key: "subject", type: "custom" },
  { label: t("Hành động"), key: "action", type: "custom" },
]);
interface SubjectsLecture {
  id: number;
  classList: Number[];
}
interface AssignedLecture {
  name: string;
  subjects: SubjectsLecture[];
}
const isShowCondition = ref(false);
const rows = ref<AssignedLecture[]>([]);
const selected = ref([]);


const deleteRow = (index: number) => {
  rows.value.splice(index, 1);
};
const condition = (index: number) => {
  console.log(index);
  isShowCondition.value = !isShowCondition.value;
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

//Mock
const data: AssignedLecture[] = [
  {
    name: "Nguyen Van A",
    subjects: [
      {
        id: 1,
        classList: [ 1, 2, 3 ]
      },
      {
        id: 2,
        classList: [ 1, 2, 3 ]
      },
    ],
  }
]
rows.value = data
</script>
<style></style>