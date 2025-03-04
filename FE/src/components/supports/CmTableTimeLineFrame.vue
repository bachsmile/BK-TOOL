<template>
  <div>
    <table>
      <tr>
        <th v-for="(header, id) in [
          '',
          '',
          'Thứ 2',
          'Thứ 3',
          'Thứ 4',
          'Thứ 5',
          'Thứ 6',
          'Thứ 7',
        ]" :key="header" :style="{
          border: id < 2 ? 'unset' : '1px solid #dddddd',
        }" @click="header ? selectColumn(header, id) : null">
          {{ header }}
        </th>
      </tr>
      <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
        <td v-if="rowIndex % 5 === 0" :rowspan="5" @click="selectShift(row[ 0 ].toString())">
          {{ row[ 0 ] }}
        </td>
        <td @click="selectRow(row, rowIndex)">
          {{ row[ 1 ] }}
        </td>
        <td v-for="(cell, cellIndex) in row.slice(2)" :key="cellIndex" @click="selectBox(rowIndex, cellIndex)">
          <CmAutocomplete v-if="cell[ 1 ] || cell[ 2 ]" v-model="cell[ 2 ]" :options="generalActivityOT" />
        </td>
      </tr>
    </table>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CmAutocomplete from "../common/CmAutocomplete.vue";
import { Option } from "@/typescript/interface";

interface Props {
  isColor?: boolean;
  table: any[];
}
const props = withDefaults(defineProps<Props>(), {
  isColor: false,
  table: () => [
    [
      "Sáng",
      "Tiết 1",
      [ 1, false, '' ],
      [ 11, false, '' ],
      [ 21, false, '' ],
      [ 31, false, '' ],
      [ 41, false, '' ],
      [ 51, false, '' ],
    ],
    [
      "Sáng",
      "Tiết 2",
      [ 2, false, '' ],
      [ 12, false, '' ],
      [ 22, false, '' ],
      [ 32, false, '' ],
      [ 42, false, '' ],
      [ 52, false, '' ],
    ],
    [
      "Sáng",
      "Tiết 3",
      [ 3, false, '' ],
      [ 13, false, '' ],
      [ 23, false, '' ],
      [ 33, false, '' ],
      [ 43, false, '' ],
      [ 53, false, '' ],
    ],
    [
      "Sáng",
      "Tiết 4",
      [ 4, false, '' ],
      [ 14, false, '' ],
      [ 24, false, '' ],
      [ 34, false, '' ],
      [ 44, false, '' ],
      [ 54, false, '' ],
    ],
    [
      "Sáng",
      "Tiết 5",
      [ 5, false, '' ],
      [ 15, false, '' ],
      [ 25, false, '' ],
      [ 35, false, '' ],
      [ 45, false, '' ],
      [ 55, false, '' ],
    ],
    [
      "Chiều",
      "Tiết 1",
      [ 6, false, '' ],
      [ 16, false, '' ],
      [ 26, false, '' ],
      [ 36, false, '' ],
      [ 46, false, '' ],
      [ 56, false, '' ],
    ],
    [
      "Chiều",
      "Tiết 2",
      [ 7, false, '' ],
      [ 17, false, '' ],
      [ 27, false, '' ],
      [ 37, false, '' ],
      [ 47, false, '' ],
      [ 57, false, '' ],
    ],
    [
      "Chiều",
      "Tiết 3",
      [ 8, false, '' ],
      [ 18, false, '' ],
      [ 28, false, '' ],
      [ 38, false, '' ],
      [ 48, false, '' ],
      [ 58, false, '' ],
    ],
    [
      "Chiều",
      "Tiết 4",
      [ 9, false, '' ],
      [ 19, false, '' ],
      [ 29, false, '' ],
      [ 39, false, '' ],
      [ 49, false, '' ],
      [ 59, false, '' ],
    ],
    [
      "Chiều",
      "Tiết 5",
      [ 10, false, '' ],
      [ 20, false, '' ],
      [ 30, false, '' ],
      [ 40, false, '' ],
      [ 50, false, '' ],
      [ 60, false, '' ],
    ],
  ],
});

interface Emit {
  (e: "select:box", data: any): void;
  (e: "select:column", data: any): void;
  (e: "select:row", data: any): void;
  (e: "select:shift", data: any): void;
}
const emit = defineEmits<Emit>();
const tableData = ref(props.table);
const generalActivityOT: Option[] = [
  { acronym: 'CC', key: 'Chào cờ', value: 1 },
  { acronym: 'SHL', key: 'Sinh hoạt lớp', value: 2 },
  { acronym: 'HDTT', key: 'Hoạt động thực tế', value: 3 },
  { acronym: 'SHC', key: 'Sinh hoạt chung', value: 4 },
  { acronym: 'DN', key: 'Dã ngoại', value: 5 },
]


const selectBox = (rowIndex: number, cellIndex: number) => {
  const row: any[] = tableData.value[ rowIndex ];
  let cell: any[] = row[ cellIndex + 2 ];
  row[ cellIndex + 2 ] = [ cell[ 0 ], true ];

  emit("select:box", {
    rowIndex,
    cellIndex,
    row,
    cell,
  });
};

const selectColumn = (cell: string, cellIndex: number) => {
  for (let i = 0; i < tableData.value.length; i++) {
    const row: any[] = tableData.value[ i ];
    row[ cellIndex ][ 1 ] = !row[ cellIndex ][ 1 ];
  }

  emit("select:column", {
    cellIndex,
    cell,
  });
};
const selectRow = (row: any[], rowIndex: number) => {
  for (let i = 2; i < tableData.value[ rowIndex ].length; i++) {
    (tableData.value[ rowIndex ][ i ] as any)[ 1 ] = !tableData.value[ rowIndex ][ i ][ 1 ];
  }

  emit("select:row", {
    rowIndex,
    row,
  });
};
const selectShift = (shift: string) => {
  const startIndex = shift === "Sáng" ? 0 : 5;
  const endIndex = shift === "Sáng" ? 5 : 10;

  for (let i = startIndex; i < endIndex; i++) {
    const row: any[] = tableData.value[ i ];
    for (let j = 2; j < row.length; j++) {
      (row[ j ] as any)[ 1 ] = !row[ j ][ 1 ];
    }
  }
  emit("select:shift", shift);
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

td {
  width: 100px;
  height: 30px;
  cursor: pointer;
}

td.denied {
  background-color: red;
}
</style>
