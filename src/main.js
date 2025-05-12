import { createApp } from 'vue';
import App from './App.vue';
import routes from './routes';
import { createPinia } from 'pinia';
import { init as bootstrapApp } from './services/bootstrapper';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

bootstrapApp();

app.use(routes); 
app.mount('#app');
