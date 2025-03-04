<template>
  <el-table
    lazy
    border
    ref="multipleTableRef"
    :data="rows"
    style="width: 100%"
    max-height="500px"
    :loading="isLoading"
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="isSelect" type="selection" width="55" />
    <el-table-column v-if="isIndex" type="index" width="50" />
    <el-table-column
      v-for="(column, id) in columns"
      :property="column.key"
      :label="t(column.label)"
      :width="column.width"
      :key="id"
    >
      <template #default="scope">
        <slot
          :id="scope.$index"
          name="row"
          :col="column.key"
          :row="scope.row"
          :context="scope.row[column.key]"
          :column="column"
        />
        <div v-if="column?.type === 'custom'" />
        <div v-else>
          {{ scope.row[column.key] }}
        </div>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty description="Không có dữ liệu" />
    </template>
  </el-table>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, nextTick } from "vue";
import { ElTable } from "element-plus";
const { t } = window.i18n();

interface Columns {
  label: string;
  key: string;
  sortable?: boolean;
  fixed?: boolean;
  width?: number;
  type?: string;
  typeOrg?: number;
  combobox?: any;
  config?: any;
  valueId?: any;
  isDate?: boolean;
  [e: string]: any;
}
interface Props {
  columns: Columns[];
  rows?: any[];
  isSelect?: boolean;
  isIndex?: boolean;
  selected?: any[];
  pageSize?: number;
  isLoading?: boolean;
  pageNumber?: number;
  totalRecord?: number;
}
const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  rows: () => [],
  selected: () => [],
  pageSize: 10,
  pageNumber: 1,
  totalRecord: 0,
  isLoading: false,
  isSelect: false,
  isIndex: false,
});

interface Emit {
  (e: "clickRow", dataRow: object, index: number): void;
  (e: "update:pageNumber", page: number): void;
  (e: "update:pageSize", size: number): void;
  (e: "update:selected", data: any[]): void;
  (e: "load"): void;
}
const emit = defineEmits<Emit>();

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<any[]>([]);
const isLoading = ref(false);
const currentPage = ref(props.pageNumber || 1);

const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val;
};

const load = () => {
  if (isLoading.value) return;
  isLoading.value = true;
  console.log("load");
  emit("load");

  // Giả sử bạn có API để tải dữ liệu
  // fetch(`your-api-url?page=${currentPage.value}&size=${props.pageSize}`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     props.rows!.push(...data.rows); // Thêm dữ liệu vào bảng
  //     currentPage.value++;
  //   })
  //   .finally(() => {
  //     isLoading.value = false;
  //   });
};

const handleScroll = () => {
  if (!multipleTableRef.value) return;

  const tableWrapper = multipleTableRef.value.$el.querySelector(
    ".el-scrollbar__wrap"
  );
  const scrollPosition = tableWrapper.scrollTop + tableWrapper.clientHeight;
  if (scrollPosition >= tableWrapper.scrollHeight - 10) {
    load();
  }
};

onMounted(() => {
  const tableWrapper = multipleTableRef.value?.$el.querySelector(
    ".el-scrollbar__wrap"
  );

  tableWrapper?.addEventListener("scroll", handleScroll);

  watch(
    () => props.selected,
    (val: any) => {
      if (val?.length) {
        nextTick(() => {
          props.selected.forEach((row) => {
            multipleTableRef.value!.toggleRowSelection(row, undefined);
          });
        });
      }
    },
    { immediate: true }
  );
});
</script>
