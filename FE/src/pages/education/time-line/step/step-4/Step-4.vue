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
            <el-input v-model="row[ col ]" placeholder="Nhập tên giáo viên" />
          </div>
          <div v-if="col === 'code'">
            <el-input v-model="row[ col ]" placeholder="Nhập mã" />
          </div>
          <div v-if="col === 'group'">
            <el-autocomplete v-model="row[ col ]" :fetch-suggestions="querySearchAsync" placeholder="Nhập tên nhóm"
              @select="handleSelect">
              <template #loading>
                <svg class="circular" viewBox="0 0 50 50">
                  <circle class="path" cx="25" cy="25" r="20" fill="none" />
                </svg>
              </template>
            </el-autocomplete>
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
    <MdAddUser v-if="isShowAdd" v-model:isShow="isShowAdd"></MdAddUser>
    <MdSettingTeacher v-if="isShowSetting" v-model:isShow="isShowSetting"></MdSettingTeacher>
    <MdTimeFree v-if="isShowCondition" v-model:isShow="isShowCondition"></MdTimeFree>
  </div>
</template>

<script lang="ts" setup>
import { Star, Delete, Plus, Setting } from "@element-plus/icons-vue";
import CmTable from "@/components/common/CmTable.vue";
import { onMounted, ref } from "vue";
import CmActionContainer from "@/components/supports/CmActionContainer.vue";
import MdAddUser from "./MdAddUser.vue";
import MdSettingTeacher from "./MdSettingTeacher.vue";
import MdTimeFree from "../../components/MdTimeFree.vue";
const { t } = window.i18n();

const columns = ref([
  { label: t("Tên giáo viên"), key: "name", type: "custom" },
  { label: t("Mã"), key: "code", type: "custom" },
  { label: t("Nhóm"), key: "group", type: "custom" },
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

const isShowSetting = ref(false);
const setting = (index: number) => {
  console.log(index);
  isShowSetting.value = !isShowSetting.value;
};


interface LinkItem {
  value: string
  link: string
}

const links = ref<LinkItem[]>([])
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ]
}
let timeout: ReturnType<typeof setTimeout>
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 500 * Math.random())
}

const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const handleSelect = (item: Record<string, any>) => {
  console.log(item)
}

onMounted(() => {
  links.value = loadAll()
})


</script>
<style></style>