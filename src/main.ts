import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import '@/services/background/background'
import '@/services/content/content-script'


createApp(App).mount('#app')
