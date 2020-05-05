import Home from '../views/Home.vue'
import store from '../store'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/recipes',
      name: 'Recipes',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "recipes" */ '../views/Recipes.vue')
    },
    {
      path: '/recipes/:name',
      name: 'Dish',
      props: true,
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "dish" */ '../views/Dish.vue'),
      beforeEnter: (to, from, next) => {
        if (from.name != "Home" && from.name != "Recipes" && from.name != "MyRecipes" && from.name != "Bookmarks") next({ name: "Recipes" });
        else next()
      }
    },
    {
      path: '/notes',
      name: 'Notes',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "notes" */ '../views/Notes.vue')
    },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "bookmarks" */ '../views/Bookmarks.vue')
    },
    {
      path: '/myrecipes',
      name: 'MyRecipes',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "myrecipes" */ '../views/MyRecipes.vue')
    },
    {
      path: '/myrecipes/new',
      name: 'NewRecipe',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "newrecipe" */ '../views/NewRecipe.vue')
    },
    {
      path: '/account',
      name: 'Account',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
      beforeEnter: (to, from, next) => {
        if (store.authenticated) next({ name: 'Home' });
        else next()
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
      beforeEnter: (to, from, next) => {
        if (store.authenticated) next({ name: 'Home' });
        else next()
      }
    }
  ]

  export { routes }
  