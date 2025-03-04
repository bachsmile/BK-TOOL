<template>
  <div>
    <CmActionContainer>
      <template #action>
        <div class="action">
          <el-tooltip effect="dark" :content="t('add')" placement="top-start">
            <el-button type="primary" :icon="Plus" circle @click="openAdd" />
          </el-tooltip>
        </div>
      </template>
      <CmTable isIndex :columns="columns" :rows="rows" :selected="selected">
        <template #row="{ id, col, row }">
          <div v-if="col === 'group'">
            <el-input v-model="row[ col ]" placeholder="Nhập tên nhóm" />
          </div>
          <div v-if="col === 'action'" class="flex-center">
            <el-button type="primary" :icon="Setting" circle @click.prevent="setting(id)" />
            <el-button type="warning" :icon="Star" circle @click.prevent="condition(id)" />
            <el-button type="danger" :icon="Delete" circle @click.prevent="deleteRow(id)" />
          </div>
        </template>
      </CmTable>
    </CmActionContainer>

    <el-button class="mt-4" style="width: 100%" @click="onAddItem">
      Add Item
    </el-button>
    <MdAddGroup v-if="isShowAdd" v-model:isShow="isShowAdd"></MdAddGroup>
    <MdSettingGroup v-if="isShowSetting" v-model:isShow="isShowSetting"></MdSettingGroup>
    <MdTimeFree v-if="isShowCondition" v-model:isShow="isShowCondition"></MdTimeFree>
  </div>
</template>

<script lang="ts" setup>
import { Star, Delete, Plus, Setting } from "@element-plus/icons-vue";
import CmTable from "@/components/common/CmTable.vue";
import { ref } from "vue";
import MdSettingGroup from "./MdSettingGroup.vue";
import MdTimeFree from "../../components/MdTimeFree.vue";
import CmActionContainer from "@/components/supports/CmActionContainer.vue";
import MdAddGroup from "./MdAddGroup.vue";
const { t } = window.i18n();

const columns = ref([
  { label: t("Tên nhóm"), key: "group", type: "custom" },
  { label: t("Hành động"), key: "action", type: "custom" },
]);
interface Setting {
  group: string;
}
const isShowAdd = ref(false);
const isShowCondition = ref(false);
const isShowSetting = ref(false);
const rows = ref<Setting[]>([]);
const selected = ref([]);

const openAdd = () => {
  isShowAdd.value = !isShowAdd.value;
};

const onAddItem = () => {
  rows.value.push({
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
const setting = (index: number) => {
  console.log(index);
  isShowSetting.value = !isShowSetting.value;
};
</script>
