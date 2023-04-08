<template>
  <div class="filter">
    <AddressSelect />
    <BaseSelect
      :options="typeOptions"
      label="类型"
      placeholder="请选择类型"
      v-model:value="formState.typeValue"
      mode="multiple"   
    />
  </div>
</template>
<script lang="ts" setup>
import { AddressSelect, BaseSelect } from "components/select";
import { defineComponent, ref, watch, reactive } from "vue";
const formState = reactive({
  typeValue: undefined,
});
const typeOptions = [
  { label: "基础", value: 1 },
  { label: "进阶", value: 2 },
  { label: "中级", value: 3 },
  { label: "高级", value: 4 },
];
watch(formState, () => {
  console.log(formState);
});
defineComponent({
  AddressSelect,
});
</script>

<style lang="scss" scoped>
.filter {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}
</style>
