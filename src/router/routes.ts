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
        component: () => import('../modules/core/components/Login.vue'),
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('../modules/core/components/Register.vue'),
      },
    {
        path: '/:catchAll(.*)',
        component: () => import('../modules/core/components/Login.vue'),
    }, // Not found
]