import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from '@/modules/auth/store/authStore'

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
  console.log('Before Transition from ' + (from.name as string) + ' to ' + (to.name as string));
  const { user } = useAuthStore();
  
  if (to.meta.requiresAuth) {
      const { sessionToken } = user;
      sessionToken ? next() : next('/login');
    } else {
      next();
    };
})

router.afterEach((to, from) => {
  console.log('Successfull Transition from ' + (from.name as string) + ' to ' + (to.name as string));
});

export default router;