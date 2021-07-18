import { createRouter, createWebHistory } from 'vue-router'
import CurrencyList from '@/components/CurrencyList.vue'
import CurrencyConverter from '@/components/CurrencyConverter.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/currency-list', component: CurrencyList },
        { path: '/converter', component: CurrencyConverter },
        { path: '/:notFound(.*)', redirect: '/currency-list' }
    ]
})

export default router
