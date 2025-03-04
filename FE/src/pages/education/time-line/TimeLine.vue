<template>
  <div>
    <CmActionContainer>
      <template #action>
        <div>
          <el-tooltip effect="dark" :content="t('add')" placement="top-start">
            <el-button
              type="primary"
              :icon="Plus"
              circle
              @click="centerDialogVisible = !centerDialogVisible"
            />
          </el-tooltip>
        </div>
      </template>
      <CmTable isSelect :columns="columns" :rows="rows" :selected="selected">
        <template #row="{ col }">
          <div v-if="col === 'date'">123</div>
          <div v-if="col === 'name'"><b class="cursor-pointer" @click="refLinkTo">{{ t("TKB") }}</b></div>
        </template>
      </CmTable>
    </CmActionContainer>
    <MdCreateTimeLine
      v-if="centerDialogVisible"
      v-model:isShow="centerDialogVisible"
    ></MdCreateTimeLine>
  </div>
</template>

<script lang="ts" setup>
import CmTable from "@/components/common/CmTable.vue";
import CmActionContainer from "@/components/supports/CmActionContainer.vue";
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import MdCreateTimeLine from "./MdCreateTimeLine.vue";
import router from "@/router";
const { t } = window.i18n();

const columns = ref([
  { label: t("date"), key: "date", type: "custom", width: 150 },
  { label: t("school_year"), key: "school_year", type: "custom", width: 150 },
  { label: t("name"), key: "name", type: "custom", width: 150 },
  { label: t("school"), key: "school" },
]);
const rows = ref([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
]);

const selected = ref([rows.value[2]]);
const centerDialogVisible = ref(false);
const refLinkTo = () => {
  router.push({ name: "time-line-edit", params: { id: 1 } });
}
</script>
