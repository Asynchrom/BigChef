import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { routes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.authenticated && localStorage.getItem('store') != null)
    store = JSON.parse(localStorage.getItem('store'))
  if (to.matched.some(record => record.meta.requiresAuth))
    if (!store.authenticated) next({ name: 'Login' })
    else next()
  else next()
})

export default router
