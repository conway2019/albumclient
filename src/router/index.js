import Vue from 'vue'
import VueRouter from 'vue-router'
import SingerManager from '../views/SingerManager.vue'
import AlbumManager from "../views/AlbumManager";
import UserManager from "../views/UserrManager";

import AlbumQuery from "../views/AlbumQuery";
import SingerQuery from "../views/SingerQuery";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'client',
    component: AlbumQuery
  },
  {
    path: '/singerQuery',
    name: 'singerQuery',
    component: SingerQuery
  },
  {
    path: '/albumQuery',
    name: 'albumQuery',
    component: AlbumQuery
  },
  {
    path: '/admin',
    name: 'admin',
    component: AlbumManager
  },
  {
    path: '/album',
    name: 'albumManager',
    component: AlbumManager
  },
  {
    path: '/singer',
    name: 'singerManager',
    component: SingerManager
  },
  {
    path: '/user',
    name: 'userManager',
    component: UserManager
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
