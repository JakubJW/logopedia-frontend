export default [
    {
        path: '/', 
        component: () => import('../App.vue'),
        children: [
            
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('modules/core/components/Login.vue'),
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('modules/core/components/Login.vue'),
    },
]