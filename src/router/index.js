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
      path: '/listarlibros',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registro',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/crearlibro',
      name: 'BookCreate',
      component: BookCreate
    }
  ]
})
