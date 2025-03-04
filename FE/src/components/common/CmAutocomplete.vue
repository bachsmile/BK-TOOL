<template>
  <el-select v-model="value" filterable :placeholder="placeholder" @change="handleChange">
    <el-option v-for="item in optionsValue" :key="item.value" :label="item.acronym || item.key" :value="item.value">
      <b>{{ item.acronym }}: </b>
      <span>{{ item.key }}</span>
    </el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { Option } from '@/typescript/interface';
import { onMounted, ref, watch } from 'vue'
interface Props {
  modelValue: any,
  placeholder: string,
  options: Option[],
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
});

interface Emit {
  (e: "focus"): void;
  (e: "blur"): void;
  (e: "update:modelValue", data: any): void;
}
const emit = defineEmits<Emit>();


const value = ref('')
const optionsValue = ref<Option[]>([])

const handleChange = () => {
  console.log(value.value)

  emit('update:modelValue', value.value)
}
watch(
  () => props.options,
  (val) => {
    console.log(val)
    if (val.length) {
      optionsValue.value = val
    }
  },
  { immediate: true }
);
onMounted(() => {
  watch(
    () => props.modelValue,
    (val) => {
      value.value = val;
      console.log('onMounted', val);
    },
    { immediate: true }
  );

})
</script>
