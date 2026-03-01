import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/nitrox',
            name: 'nitrox',
            component: () => import('../views/NitroxView.vue')
        },
        {
            path: '/planning',
            name: 'planning',
            component: () => import('../views/PlanningView.vue')
        },
        {
            path: '/knowledge',
            name: 'knowledge',
            component: () => import('../views/KnowledgeView.vue')
        },
        {
            path: '/divemaster',
            name: 'divemaster',
            component: () => import('../views/DivemasterView.vue')
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('../views/SettingsView.vue')
        },
        {
            path: '/ballast',
            name: 'ballast',
            component: () => import('../components/calculators/BallastCalculator.vue')
        },
        {
            path: '/sac',
            name: 'sac',
            component: () => import('../components/calculators/SacCalculator.vue')
        }
    ]
})

export default router
