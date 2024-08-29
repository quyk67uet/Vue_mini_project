import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  { path: '/home', 
    name: 'home', 
    component: HomeView 
  },
  { path: '/product', name: 'product.list', component: () => import('../views/products/List.vue'), meta: { requiresAuth: true } },
  { path: '/product/create', name: 'product.create', component: () => import('../views/products/Form.vue'), meta: { requiresAuth: true } },
  { path: '/product/edit/:id', name: 'product.edit', component: () => import('../views/products/Form.vue'), meta: { requiresAuth: true } },
  { path: '/user', name: 'user.list', component: () => import('../views/users/List.vue'), meta: { requiresAuth: true } },
  { path: '/user/create', name: 'user.create', component: () => import('../views/users/Form.vue'), meta: { requiresAuth: true } },
  { path: '/user/edit/:id', name: 'user.edit', component: () => import('../views/users/Form.vue'), meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: () => import('../views/Login.vue') },
  { path: '/register', name: 'register', component: () => import('../views/Register.vue') }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = !!localStorage.getItem('token');

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;