import { createApp } from 'vue';
import App from './App.vue';
import routes from './routes';
import { createPinia } from 'pinia';
import { useUserStore } from './stores/userStore';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const userStore = useUserStore();
userStore.onBootLogIn();

app.use(routes); 
app.mount('#app');
