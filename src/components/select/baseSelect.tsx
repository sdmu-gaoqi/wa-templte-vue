import { defineComponent } from "vue";
import styles from "./baseSelect.module.scss";

export default defineComponent({
  props: ["options", "label", "placeholder", "value", "mode"],
  emits: ["update:value"],
  setup(props, context) {
    return () => (
      <div class={styles.wrapper}>
        <div class={styles.label}>{props.label}:</div>
        <a-select
          options={props.options}
          placeholder={props.placeholder}
          value={props.value}
          allowClear={true}
          mode={props.mode || ""}
          onChange={(value: any) => {
            context.emit("update:value", value);
          }}
        ></a-select>
      </div>
    );
  },
});
