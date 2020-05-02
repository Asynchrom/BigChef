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
  if (!store.authenticated) {
      store.credentials._id = sessionStorage.getItem('_id')
      if(store.credentials._id) {
        store.credentials.username = sessionStorage.getItem('username')
        store.credentials.password = sessionStorage.getItem('password')
        store.credentials.gender = sessionStorage.getItem('gender')
        store.credentials.bookmarks = JSON.parse(sessionStorage.getItem('bookmarks'))
        console.log(store.credentials.bookmarks)
        store.authenticated = true
      }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.authenticated) {
      next({ name: 'Login' })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
