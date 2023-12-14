import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from '@/modules/auth/store/authStore'

const router = createRouter({
    history: createWebHistory(),
    routes
})

const localStorageKey = import.meta.env.VITE_AUTH_LOCAL_STORAGE_KEY

router.beforeEach(async (to, from, next) => {
  console.log('Before Transition from ' + (from.name as string) + ' to ' + (to.name as string));
  
  const { updateUser } = useAuthStore();
  const authJSON = localStorage.getItem(localStorageKey);
  let authState;
  
  if (authJSON) {
    authState = JSON.parse(authJSON);
    updateUser(authState);
  };

  if (authState && authState.sessionToken) {
    if (to.name === 'login' || to.name === 'register') {
      next('/dashboard');
    } else {
      next();
    }
  } else {
    if (to.meta.requiresAuth) {
      next('/login');
    } else {
      next();
    };
  };
});

router.afterEach((to, from) => {
  console.log('Successfull Transition from ' + (from.name as string) + ' to ' + (to.name as string));
});

export default router;