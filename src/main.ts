import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router'

import '@/services/background/background'
import '@/services/content/content-script'


createApp(App)
  .use(router)
  .mount('#app')
