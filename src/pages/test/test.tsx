import { defineComponent } from "vue";
import { Storage } from "wa-utils";
const storage = new Storage("local");

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    storage.set("name", { content: "world" });
    return () => (
      <div>
        <h1>......</h1>
      </div>
    );
  },
});
