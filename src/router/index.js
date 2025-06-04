import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import PublicRoutes from './PublicRoutes';
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    MainRoutes,
    PublicRoutes
  ]
});

// Навигационный guard для защищённых роутов
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuthStore();

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login');
  }

  if (!to.meta.requiresAuth && isAuthenticated) {
    return next('/dashboard');
  }

  next();
});

// router.beforeEach(async (to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/'];
//   const authStore = useAuthStore();

//   const isPublicPage = publicPages.includes(to.path);
//   const authRequired = !isPublicPage && to.matched.some((record) => record.meta.requiresAuth);

//   // User not logged in and trying to access a restricted page
//   if (authRequired && !authStore.user) {
//     authStore.returnUrl = to.fullPath; // Save the intended page
//     next('/login');
//   } else if (authStore.user && to.path === '/login') {
//     // User logged in and trying to access the login page
//     next({
//       query: {
//         ...to.query,
//         redirect: authStore.returnUrl !== '/' ? to.fullPath : undefined
//       }
//     });
//   } else {
//     // All other scenarios, either public page or authorized access
//     next();
//   }
// });

router.beforeEach(() => {
  const uiStore = useUIStore();
  uiStore.isLoading = true;
});

router.afterEach(() => {
  const uiStore = useUIStore();
  uiStore.isLoading = false;
});
