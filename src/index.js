// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'

// import firebase
import router from "./routes/index";
import * as firebase from "firebase";
import store from "./store";
 
// import bootstrap
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

// firebase config settings

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});


Vue.use(BootstrapVue)

Vue.use(VueResource)

// var database = ;

// export const database = firebase.database();




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
