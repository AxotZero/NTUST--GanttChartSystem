import Vue from "vue"
import Router from "vue-router"
import Login from "../components/Login"
import Register from "../components/Register"
import Dashboard from "../components/Dashboard"
import DataBaseTesting from "../components/DataBaseTesting.vue"
import Manage from "../components/Manage.vue"
Vue.use(Router)

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Login
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/dashboard/:id",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/DataBaseTesting",
      name: "DataBaseTesting",
      component: DataBaseTesting
    },
    {
        path: '/Manage',
        name: 'Manage',
        component: Manage
    },

  ]
})

export default router
