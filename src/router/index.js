import Vue from 'vue'
import VueRouter from 'vue-router'
import SingerManager from '../views/SingerManager.vue'
import AlbumManager from "../views/AlbumManager";
import UserManager from "../views/UserrManager";

Vue.use(VueRouter)

const routes = [
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
