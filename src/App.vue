<template>
  <div id="app" class="app">
    <!-- <div class="logo">
      LOGO
    </div> -->
    <navbar></navbar>
    <router-view></router-view>

    <!-- <love></love> -->
  </div>
</template>

<script>
import localStorage from "./components/localStorage"
import navbar from "./components/Navbar"
import firebase from "firebase"

const config = {
  apiKey: "AIzaSyA4DqJWpQDzZC1x_-ns-GUU_q7WxbfckOc",
  authDomain: "ganttchartsystem.firebaseapp.com",
  databaseURL: "https://ganttchartsystem.firebaseio.com",
  projectId: "ganttchartsystem",
  storageBucket: "ganttchartsystem.appspot.com",
  messagingSenderId: "451931899257",
  appId: "1:451931899257:web:ef06dcb931bc77b3ae5ba8",
  measurementId: "G-P5ZTTVK2HB"
}
firebase.initializeApp(config)

export default {
  name: "app",
  components: {
    localStorage,
    navbar
  }
}
</script>

<style lang="stylus">
@import "../src/styles/_vars.styl"
*, *::after, *::before
  box-sizing border-box

body
  background-color : white

.app
  font-family: "Avenir", Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #333
  margin-top: 60px

.logo
  vhc()
  margin-left auto
  margin-right auto
  width 240px
  height 240px
  border-radius 100%
  border 2px solid rgba(255,255,255,.8)

</style>
