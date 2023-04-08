<template>
  <div class="wrapper">
    <div class="tipText">地区:</div>
    <div class="label" @click="click">
      <div v-if="value?.length < 1">请选择</div>

      <a-tooltip v-if="value?.length > 0">
        <template #title>{{
          value?.map((item) => item.name).join("、")
        }}</template>
        {{
          value
            ?.map((item) => item.name)
            .join("、")
            .slice(0, 10) + "..."
        }}
      </a-tooltip>
    </div>
  </div>
  <Modal ref="modalRef" :address="address" :save="save" />
</template>

<script lang="ts" setup>
import { GETADDRESS } from "@/store/actions";
import {
  onBeforeMount,
  toRefs,
  toRaw,
  watch,
  reactive,
  ref,
  toRef,
  computed,
} from "vue";
import { useStore } from "vuex";
import _ from "lodash";
import Modal from "../modal/addressModal.vue";
const modalRef = ref<{ show: () => void } | null>(null);
const value = ref([]);
const store = useStore();
const addressStore = store.state.address;
const address = toRef(addressStore, "address");
const click = () => {
  modalRef?.value?.show()!;
};
const save = (sendValue: any[]) => {
  value.value = sendValue;
};
onBeforeMount(() => {
  if (_.isEmpty(address.value)) {
    store.dispatch({ type: `address/${GETADDRESS}` });
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: max-content;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  @include filterBox;
  .tipText {
    margin-right: 10px;
  }
  .label {
    background-color: $mainBgc;
    border-radius: 4px;
    padding: 0 10px;
    height: 40px;
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: $mainColor;
  }
}
</style>
