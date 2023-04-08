<template>
  <a-modal
    v-model:visible="visible"
    title="选择地区"
    @ok="handleOk"
    :width="720"
    wrapClassName="selectAddressModal"
    okText="保存"
    :centered="true"
    :cancelButtonProps="{
      style: {
        display: 'none',
      },
    }"
  >
    <div class="header">
      省份首字母:
      <div
        v-for="item in addressData"
        :class="activeCode === item.code ? 'active' : ''"
        @click="() => clickCode(`${item.code}`)"
      >
        {{ item.code.toUpperCase() }}
      </div>
    </div>
    <div>
      <div class="content" id="addressScroll">
        <div v-for="item in addressData" :id="item.code + '_box'">
          <div class="address">
            <div class="addressCode">
              {{ item.code.toUpperCase() }}
            </div>
            <div>
              <div v-for="proItem in item.sub" class="proviceBody">
                <div
                  :class="`provice ${selectValues?.find((item: ShowCityItem) => item.id === proItem.id) ? 'selectedProvice' : ''}`"
                  @click="() => changeSelect('provice', toRaw(proItem))"
                >
                  {{ proItem.name }}:
                </div>
                <div class="cityBody">
                  <div
                    v-for="cityItem in proItem.sub"
                    :class="`city ${selectValues.find((item: ShowCityItem) => item.id === cityItem.id || item.cityId === cityItem.id) ? 'selected' : ''}`"
                    @click="
                      () => {
                        selectCity(cityItem, proItem);
                        changeSelect('city', {
                          ...cityItem,
                          proviceId: proItem.id,
                          proviceName: proItem.name,
                        });
                      }
                    "
                  >
                    {{ cityItem.name }}
                  </div>
                </div>
                <div
                  class="activeCitys"
                  v-if="showCity.some((item: ShowCityItem) => item?.proviceId === proItem.id)"
                >
                  <div
                    :class="`city ${selectValues?.find((item: ShowCityItem) => item.id === showCity?.find((item: ShowCityItem) => item?.proviceId === proItem?.id)!?.id) ? 'selected' : ''}`"
                    @click="() => {
                    changeSelect('city', toRaw(showCity?.find((item: ShowCityItem) => item?.proviceId === proItem?.id)!), {
                      selectAll: true
                    })
                  }"
                  >
                    全部
                  </div>
                  <div
                    v-for="showCityItem in showCity.find(
                      (item: ShowCityItem) => item?.proviceId === proItem.id
                    )?.sub"
                    @click="
                      () =>
                        changeSelect('district', {
                          ...showCityItem,
                          proviceId: proItem.id,
                          proviceName: proItem.name,
                        })
                    "
                    :class="`district ${selectValues.find((item: ShowCityItem) => item.id === showCityItem.id) ? 'selected' : ''}`"
                  >
                    {{ showCityItem.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="selectedScroll">
        <div class="selectedScrollHead">已选({{ selectValues.length }})</div>
        <div v-for="selectItem in selectValues" class="selectTag">
          {{
            [selectItem?.proviceName, selectItem?.cityName, selectItem?.name]
              ?.filter((item) => item)
              .join("-")
          }}
          <span class="closeIcon" @click.stop="() => remove(selectItem)"
            >x</span
          >
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { addressItem } from "@/store/modules/address";
import { valueToNode } from "@babel/types";
import {
  ref,
  toRef,
  computed,
  onMounted,
  watch,
  nextTick,
  reactive,
  Ref,
  toRaw,
} from "vue";
import { scrollListener } from "./tools";
import { AddressType } from "./types";
type ShowCityItem = addressItem & {
  proviceId?: number;
  cityId?: number;
  proviceName?: string;
  cityName?: string;
};
const activeCode = ref("a");
let showCity = ref([]);
const selectValues = ref([]);
const props = defineProps(["address", "save"]);
const address = toRef(props, "address");
const addressData = computed(() => {
  const newAddress = [];
  for (let i in address.value) {
    newAddress.push({
      code: i,
      sub: address.value[i],
    });
  }
  return newAddress;
});
const visible = ref(false);
const handleOk = () => {
  props.save && props.save(toRaw(selectValues.value));
  visible.value = false;
};
const show = () => {
  visible.value = true;
};
const close = () => {
  visible.value = false;
};
const clickCode = (id: string) => {
  const scrollEl = document.querySelector("#addressScroll");
  const targetEl = document.querySelector(`#${id}_box`) as HTMLElement;
  activeCode.value = id;
  if (targetEl) {
    scrollEl?.scrollTo({
      top: targetEl?.offsetTop!,
    });
  }
};
const selectCity = (cityItem: addressItem, proItem: addressItem) => {
  const item = {
    id: cityItem.id,
    name: cityItem.name,
    sub: cityItem.sub,
    proviceId: proItem.id,
    proviceName: proItem.name,
  };
  const isSlot = showCity.value?.some(
    (item: addressItem) => item?.id === cityItem.id
  );
  const newShowCity = showCity?.value.filter(
    (item: ShowCityItem) => item.proviceId !== proItem.id
  );
  showCity.value = isSlot ? newShowCity : [...newShowCity, item];
};
const changeSelect = (
  type: AddressType,
  value: ShowCityItem,
  other?: { selectAll: boolean }
) => {
  const selectAll = other?.selectAll || false;
  if (type === "district") {
    const city = showCity?.value?.find(
      (item: ShowCityItem) => item?.proviceId === value?.proviceId
    ) as unknown as ShowCityItem;
    const cityId = city?.id;
    const cityName = city?.name;
    const proviceId = city?.proviceId;
    let newSelectValue = selectValues?.value?.filter(
      (item: ShowCityItem) => item?.id !== proviceId && item.id !== cityId
    );
    const isSlot = selectValues?.value?.some(
      (item: ShowCityItem) => item.id === value.id
    );
    newSelectValue = isSlot
      ? newSelectValue.filter((item: ShowCityItem) => item.id !== value.id)
      : [...newSelectValue, toRaw({ ...value, cityId, cityName })];
    selectValues.value = newSelectValue;
  } else if (type === "city") {
    const isSlot = selectValues?.value?.some(
      (item: ShowCityItem) => item?.id === value?.id
    );
    const rawValue = toRaw(selectValues?.value);
    let newSelectValue = rawValue?.filter(
      (item: ShowCityItem) => item?.id !== value?.proviceId
    );
    if (selectAll) {
      newSelectValue = isSlot
        ? newSelectValue?.filter(
            (item: ShowCityItem) =>
              item?.cityId !== value?.id && item?.id !== value?.id
          )
        : [
            ...newSelectValue?.filter(
              (item: ShowCityItem) => item?.cityId !== value.id
            ),
            value,
          ];
    } else {
      if (
        !isSlot &&
        !selectValues.value.find(
          (item: ShowCityItem) => item?.cityId === value?.id
        )
      ) {
        newSelectValue = [...newSelectValue, value];
      }
    }
    selectValues.value = newSelectValue;
  } else if (type === "provice") {
    const isSlot = selectValues?.value?.some(
      (item: ShowCityItem) => item.id === value?.id
    );
    const newSelectValues = (selectValues?.value as ShowCityItem[])?.reduce(
      (result: any, item) => {
        if (item?.id === value?.id) {
          return isSlot
            ? result?.filter((item: ShowCityItem) => item.id !== value.id)
            : [...result, item];
        } else if (item?.proviceId === value.id) {
          return result;
        } else {
          return [...result, toRaw(item)];
        }
      },
      [value]
    );
    selectValues.value = newSelectValues;
  }
};

const remove = (value: ShowCityItem) => {
  selectValues.value = selectValues.value.filter(
    (item: ShowCityItem) => item.id !== value.id
  );
};

watch(visible, () => {
  if (visible) {
    nextTick(() => {
      scrollListener((code) => {
        activeCode.value = code;
      });
    });
  }
});

defineExpose({
  show,
  close,
});
</script>

<style lang="scss" scoped>
.selectAddressModal {
  .ant-modal-body {
    scroll-behavior: smooth;
    .header {
      padding: 10px 0;
      border: 1px solid #f0f0f0;
      border-left: none;
      border-right: none;
      display: flex;
      div {
        cursor: pointer;
        margin-left: 15px;
        padding: 0 5px;
      }
    }
    .content {
      max-height: 60vh !important;
      overflow: hidden auto !important;
      scroll-behavior: smooth;
      user-select: none;
    }
  }
  .address {
    display: flex;
    align-items: baseline;
    .addressCode {
      font-size: 24px;
      font-weight: 700;
      color: #bfbfbf;
      cursor: pointer;
      line-height: 1;
      flex: 0 0 20px;
    }
    .proviceBody {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      .provice {
        font-size: 14px;
        color: #595959;
        width: 52px;
        text-align: right;
        cursor: pointer;
        padding-right: 5px;
      }
      .activeCitys {
        width: 100%;
        margin-left: 52px;
        display: flex;
        flex-wrap: wrap;
        background-color: #f6f6f6;
        margin-right: 20px;
      }
    }
    .cityBody {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
    }
  }
}
</style>

<style lang="scss" scoped>
.active {
  background-color: $mainBgc;
  color: $mainColor;
  border-radius: 6px;
}
.selectedProvice {
  background-color: $mainColor;
  color: #fff !important;
  border-radius: 20px 0 0 20px;
}
.selected {
  background-color: $mainColor;
  color: #fff !important;
}
.city,
.district {
  display: inline-block;
  padding: 2px 16px;
  border-radius: 4px !important;
  line-height: 22px;
  cursor: pointer;
  font-size: 14px;
  color: #595959;
  margin: 4px;
}
.selectedScroll {
  max-height: 100px;
  overflow: hidden auto;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #e9e9e9;
  padding-top: 10px;
  user-select: none;
  .selectedScrollHead {
    padding: 5px 0;
    width: 100%;
  }
  .selectTag {
    color: #595959;
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
    border: 1px solid $mainColor;
    margin-right: 8px;
    font-size: 14px;
    margin-bottom: 8px;
    transition: all 0.2s;
    border-radius: 4px !important;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .closeIcon {
    margin-left: 10px;
  }
}
</style>
