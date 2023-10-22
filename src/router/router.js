import { createRouter, createWebHistory } from 'vue-router';
import Main from '../page/Main';
import UserPage from '../page/UserPage';
import AboutUs from '../page/AboutUs';
import PostIdPage from '../page/PostIdPage';

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/usersPosts',
    component: UserPage,
  },
  {
    path: '/about',
    component: AboutUs,
  },
  {
    path: '/usersPosts/:id',
    component: PostIdPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
