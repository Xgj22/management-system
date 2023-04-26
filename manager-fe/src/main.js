import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import request from './utils/request.js'
import storage from './utils/storage.js'
import api from './api/index.js'
import store from './store'
console.log('环境变量==>',import.meta.env)

const app = createApp(App)
app.config.globalProperties.$request = request;
app.config.globalProperties.$storage = storage;
app.config.globalProperties.$api = api
app.use(router).use(store).use(ElementPlus,{size:'small'}).mount('#app')