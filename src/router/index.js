import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Wowouts from '@/components/Wowouts'
import Shame from '@/components/Shame'
import Profile from '@/components/Profile'

Vue.use(Router)

const authCheck = (to, from, next) => {
  if (!localStorage.getItem('token')) {
    return next({ path: '/login' })
  }

  next()
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: authCheck
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next({ path: '/' })
        }

        next()
      }
    },
    {
      path: '/wowouts',
      name: 'Wowouts',
      component: Wowouts,
      beforeEnter: authCheck
    },
    {
      path: '/shame',
      name: 'Shame',
      component: Shame,
      beforeEnter: authCheck
    },
    {
      path: '/me',
      name: 'Profile',
      component: Profile,
      beforeEnter: authCheck
    }
  ]
})
