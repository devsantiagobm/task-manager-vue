import TasksPage from '@/modules/tasks/page/tasks.page.vue'
import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from './modules/welcome/page/welcome.page.vue'

const routes = [
    { path: '/', component: TasksPage },
    { path: '/welcome', component: WelcomePage },
]


export const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to) => {
    const isFirstTime = !Boolean(localStorage.getItem("firstTime") ?? false)

    if (to.path === "/" && isFirstTime) {
        return { path: '/welcome' }
    }

    return true
})