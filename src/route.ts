import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Layout from "./components/layout/layout.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/login/login.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("./pages/test/test.tsx"),
  },
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "main",
        component: () => import("./pages/home/home.vue"),
      },
      {
        path: "/table-form",
        name: "table-form",
        component: () => import("./pages/tableForm/tableForm.vue"),
      },
      {
        path: "/chart-page1",
        name: "chart-page1",
        component: () => import("./pages/chart/chart1.vue"),
      },
      {
        path: "/amap-page1",
        name: "amap-page1",
        component: () => import("./pages/amap/amap.vue"),
      },
    ],
  },
];

const route = createRouter({
  routes,
  history: createWebHistory(),
});

route.beforeEach((to, from, next) => {
  const toPath = to.path;
  if (!["/login", "/test"].includes(toPath) && !localStorage.getItem("token")) {
    next({ path: "/login" });
  }
  next();
});

export default route;
