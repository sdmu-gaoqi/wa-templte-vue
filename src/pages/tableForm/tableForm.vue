<template>
  <TableHead />
  <a-table
    :columns="columns"
    :data-source="data"
    bordered
    :loading="loading"
    :scroll="{ y: '60vh' }"
  >
    <template #bodyCell="{ column, text }">
      <a>{{ text }}</a>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { tableData, columns } from "./data";
import { reactive, onMounted, ref } from "vue";
import TableHead from './tableHead.vue'
type tableItem = Partial<typeof tableData[0]>;
let data: tableItem[] = reactive([]);
let loading = ref(false);
const getData = () => {
  loading.value = true;
  setTimeout(() => {
    data = tableData;
    loading.value = false;
  }, 2000);
};
onMounted(() => {
  getData();
});
</script>
