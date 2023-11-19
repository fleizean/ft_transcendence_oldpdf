import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../views/LoginForm.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'loginform',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'registerform',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: RegisterForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
