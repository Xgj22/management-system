import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '@/components/Home.vue'

const routes = [
    //重定向,在项目跑起来的时候，访问/，立刻访问到首页
    // {
    //     path:'/',
    //     redirect:"/login",
    //     meta:{
    //         title:'登录页'
    //     }
    // },
    {
        name: 'home',
        path: '/',
        meta: {
            title: '首页'
        },
        component:  () => import('../components/Home.vue'),
        redirect:'/login',
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