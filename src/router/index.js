import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/community'
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import(/* webpackChunkName: "model" */ '../views/Community.vue')
  },
  {
    path: '/model',
    component: () => import(/* webpackChunkName: "model" */ '../views/Model.vue')
  },
  {
    path: '/floorplan',
    component: () => import(/* webpackChunkName: "floorplan" */ '../views/Floorplan.vue')
  },
  {
    path: '/elevation',
    component: () => import(/* webpackChunkName: "elevation" */ '../views/Elevation.vue')
  },
  {
    path: '/interior-colour',
    component: () => import(/* webpackChunkName: "interior_colour" */ '../views/InteriorColour.vue')
  },
  {
    path: '/packaged-options',
    component: () => import(/* webpackChunkName: "additional_options" */ '../views/PackagedOptions.vue')
  },
  {
    path: '/lot',
    component: () => import(/* webpackChunkName: "lot" */ '../views/Lot.vue')
  },
  // {
  //   path: '/seasonal-section',
  //   component: () => import(/* webpackChunkName: "lot" */ '../views/SeasonalSection.vue')
  // },// edited by jove
  { 
    path: '/basements-options',
    component: () => import(/* webpackChunkName: "BasementsOptions" */ '../views/BasementsOptions.vue')
  },
  { 
    path: '/seasonal-options',
    component: () => import(/* webpackChunkName: "SeasonalOptions" */ '../views/SeasonalOptions.vue')
  },
  { 
    path: '/plumbing-options',
    component: () => import(/* webpackChunkName: "PlumbingOptions" */ '../views/PlumbingOptions.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
