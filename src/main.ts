import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import route from "./route";
import "ant-design-vue/dist/antd.less";
import Antd from "ant-design-vue";
import "./assets/style/main.less";
import store from "./store/store";

createApp(App).use(Antd).use(route).use(store).mount("#app");
