import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import route from "./route";
import "ant-design-vue/dist/antd.less";
import Antd from "ant-design-vue";
import store from "./store/store";
import "./styles/global.css";

createApp(App).use(Antd).use(route).use(store).mount("#app");
