import { createRouter, createWebHistory } from "vue-router";
import { guestOnly } from "@/middleware/authMiddleware";

const routes = [
  {
    path: "/",
    component: () => import("../layout/Main.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../pages/Home.vue"),
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("../pages/Login.vue"),
        beforeEnter: guestOnly,
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("../pages/Register.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../pages/NotFound.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
