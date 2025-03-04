<template>
  <div>
    <CmTableTimeLine :table="tableData"></CmTableTimeLine>
    <div>
      <h1>TimeTable Scheduler</h1>
      <button @click="generateTimetable">Generate Timetable</button>
      <div v-if="schedule">
        <h2>Schedule:</h2>
        <pre>{{ schedule }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CmTableTimeLine from '@/components/supports/CmTableTimeLine.vue';
import { ref } from 'vue';
import MethodsUtil from '@/utils/MethodsUtil';
const tableData = ref([
  [
    "Sáng",
    "Tiết 1",
    [ 1, true, 'Chào cờ', 'Trần Xuân Bách' ],
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
    [ 12, true, 'Toán', 'Ninh Khánh Duy' ],
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
])

let schedule: any
const generateTimetable = async () => {
  const num_classes = 1
  const num_days = 5
  const num_sessions = 1
  const num_periods = 5

  const subjects = {
    "Tiếng anh": { "total_week": 4, "consecutive": 2, "teachers": "TeacherC" },
    "Toán": { "total_week": 4, "consecutive": 1, "teachers": "TeacherE" },
    "Vật lý": { "total_week": 3, "consecutive": 3, "teachers": "TeacherA" },
  }

  try {
    const params = {
      num_classes: num_classes,
      num_days: num_days,
      num_sessions: num_sessions,
      num_periods: num_periods,
      subjects: subjects
    }
    MethodsUtil.requestApiCustom('http://127.0.0.1:8000/schedule', 'POST', params).then((response) => {

      schedule = response?.data.schedule;
      console.log(schedule);

    })
  } catch (error) {
    console.error('Error generating timetable:', error);
  }
}
</script>

<style scoped></style>