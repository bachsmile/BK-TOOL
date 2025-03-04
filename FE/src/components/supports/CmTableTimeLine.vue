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
        <td v-if="rowIndex % 5 === 0" :rowspan="5" style="background-color: unset"
          @click="selectShift(row[ 0 ].toString())">
          {{ row[ 0 ] }}
        </td>
        <td style="background-color: unset" @click="selectRow(row, rowIndex)">
          {{ row[ 1 ] }}
        </td>
        <td :style="{ 'background-color': isColor ? cell[ 1 ] ? '#28a745' : '#dc3545' : 'unset' }"
          v-for="(cell, cellIndex) in row.slice(2)" :key="cellIndex" @click="isColor?selectBox(rowIndex, cellIndex):''">
          <div class="text-center mb-1 "> {{ cell[ 2 ] }}</div>
          <div class="text-center" v-if="cell[ 3 ]">
            <el-tag type="primary" effect="plain" round>
              {{ cell[ 3 ] }}
            </el-tag>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script setup lang="ts">
import { Ref, ref } from "vue";

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
      [ 1, true, '' ],
      [ 11, true, '' ],
      [ 21, true, '' ],
      [ 31, true, '' ],
      [ 41, true, '' ],
      [ 51, true, '' ],
    ],
    [
      "Sáng",
      "Tiết 2",
      [ 2, true, '' ],
      [ 12, true, '' ],
      [ 22, true, '' ],
      [ 32, true, '' ],
      [ 42, true, '' ],
      [ 52, true, '' ],
    ],
    [
      "Sáng",
      "Tiết 3",
      [ 3, true, '' ],
      [ 13, true, '' ],
      [ 23, true, '' ],
      [ 33, true, '' ],
      [ 43, true, '' ],
      [ 53, true, '' ],
    ],
    [
      "Sáng",
      "Tiết 4",
      [ 4, true, '' ],
      [ 14, true, '' ],
      [ 24, true, '' ],
      [ 34, true, '' ],
      [ 44, true, '' ],
      [ 54, true, '' ],
    ],
    [
      "Sáng",
      "Tiết 5",
      [ 5, true, '' ],
      [ 15, true, '' ],
      [ 25, true, '' ],
      [ 35, true, '' ],
      [ 45, true, '' ],
      [ 55, true, '' ],
    ],
    [
      "Chiều",
      "Tiết 1",
      [ 6, true, '' ],
      [ 16, true, '' ],
      [ 26, true, '' ],
      [ 36, true, '' ],
      [ 46, true, '' ],
      [ 56, true, '' ],
    ],
    [
      "Chiều",
      "Tiết 2",
      [ 7, true, '' ],
      [ 17, true, '' ],
      [ 27, true, '' ],
      [ 37, true, '' ],
      [ 47, true, '' ],
      [ 57, true, '' ],
    ],
    [
      "Chiều",
      "Tiết 3",
      [ 8, true, '' ],
      [ 18, true, '' ],
      [ 28, true, '' ],
      [ 38, true, '' ],
      [ 48, true, '' ],
      [ 58, true, '' ],
    ],
    [
      "Chiều",
      "Tiết 4",
      [ 9, true, '' ],
      [ 19, true, '' ],
      [ 29, true, '' ],
      [ 39, true, '' ],
      [ 49, true, '' ],
      [ 59, true, '' ],
    ],
    [
      "Chiều",
      "Tiết 5",
      [ 10, true, '' ],
      [ 20, true, '' ],
      [ 30, true, '' ],
      [ 40, true, '' ],
      [ 50, true, '' ],
      [ 60, true, '' ],
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

const selectBox = (rowIndex: number, cellIndex: number) => {
  const row: any[] = tableData.value[ rowIndex ];
  let cell: any[] = row[ cellIndex + 2 ];
  row[ cellIndex + 2 ] = [ cell[ 0 ], !cell[ 1 ] ];

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
