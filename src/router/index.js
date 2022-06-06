import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/components/BookList'
import Login from '@/components/Login'
import Register from '@/components/Register'
import BookCreate from '@/components/BookCreate'
import Welcome from '@/components/Welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/bookcreate',
      name: 'BookCreate',
      component: BookCreate
    }
  ]
})
