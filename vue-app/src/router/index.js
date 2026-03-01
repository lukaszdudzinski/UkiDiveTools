import { createRouter, createWebHistory } from 'vue-router';

// Lazy loading views for better PWA performance
const HomeView = () => import('@/views/HomeView.vue');
const NitroxView = () => import('@/views/NitroxView.vue');
const PlanningView = () => import('@/views/PlanningView.vue');
const BlendingView = () => import('@/views/BlendingView.vue');
const BallastView = () => import('@/views/BallastView.vue');
const KnowledgeView = () => import('@/views/KnowledgeView.vue');
const DivemasterView = () => import('@/views/DivemasterView.vue');
const SettingsView = () => import('@/views/SettingsView.vue');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: { title: 'Uki\'s Dive Tools' }
    },
    {
        path: '/tools/nitrox',
        name: 'Nitrox',
        component: NitroxView,
        meta: { title: 'Nitrox & Trimix Tools' }
    },
    {
        path: '/tools/planning',
        name: 'Planning',
        component: PlanningView,
        meta: { title: 'Planowanie (SAC/Rock Bottom)' }
    },
    {
        path: '/tools/blending',
        name: 'Blending',
        component: BlendingView,
        meta: { title: 'Blending Gazów' }
    },
    {
        path: '/tools/ballast',
        name: 'Ballast',
        component: BallastView,
        meta: { title: 'Kalkulator Balastu' }
    },
    {
        path: '/knowledge',
        name: 'Knowledge',
        component: KnowledgeView,
        meta: { title: 'Baza Wiedzy' }
    },
    {
        path: '/divemaster',
        name: 'Divemaster',
        component: DivemasterView,
        meta: { title: 'Narzędzia Divemastera' }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsView,
        meta: { title: 'Ustawienia' }
    },
    // Catch-all route to redirect home
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0, behavior: 'smooth' };
        }
    }
});

// Update document title based on route meta
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = "Uki's Dive Tools";
    }
    next();
});

export default router;
