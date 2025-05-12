import { useUserStore } from "@/stores/userStore";

export const init = () => {
  userBootstrap();
};

const userBootstrap = () => {
  useUserStore().onBootLogIn();
};