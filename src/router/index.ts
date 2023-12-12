import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    console.log('Before Transition from ' + (from.name as string) + ' to ' + (to.name as string));
    
    if (to && to.name !== 'login') {
        next('/login');
    } else {
        next();
    }
})

router.afterEach((to, from) => {
    console.log('Successfull Transition from ' + (from.name as string) + ' to ' + (to.name as string));
});

export default router;