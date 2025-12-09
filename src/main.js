import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { inject } from '@vercel/analytics'
import './style.css'
import App from './App.vue'

inject()

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
