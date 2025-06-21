import TasksPage from '@/modules/tasks/page/tasks.page.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: TasksPage },
    { path: '/welcome', component: TasksPage },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

