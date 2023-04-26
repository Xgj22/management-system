import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '@/components/Home.vue'

const routes = [
    {
        name: 'home',
        path: '/',
        meta: {
            title: '首页'
        },
        component:  () => import('../components/Home.vue'),
        redirect: '/welcome',
        children: [
            {
                name: 'welcome',
                path: '/welcome',
                meta: {
                    title: '欢迎体验Vue3全栈课程'
                },
                component: () => import('../views/Welcome/index.vue')
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: () => import('../views/Login/index.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router