export default [
    {
        path: '/', 
        component: () => import('../App.vue'),
        children: [
            {
                name: 'dashboard',
                path: '/dashboard',
                component: () => import('modules/dashboard/components/Dashboard.vue'),
            },        
        ],
        meta: { requiresAuth: true }
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('modules/auth/components/Login.vue'),
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('modules/auth/components/Register.vue'),
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('modules/auth/components/Login.vue'),
    },
]