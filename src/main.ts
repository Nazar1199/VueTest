import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui';
import { createPinia } from 'pinia'
import UserList from './components/UserList.vue';
import UserItem from './components/UserItem.vue';

const app = createApp(App);
const pinia = createPinia()

app.component('UserList', UserList);
app.component('UserItem', UserItem);
app.use(naive);
app.use(pinia);
app.mount('#app');
