<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
    <b-navbar-brand href="#">Gantt-Chart</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">
            <!-- <div class="nav-item">{{user.data.displayName}}</div> -->
            <li class="nav-item">
              <a class="nav-link" >Name: {{user.data.displayName}}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" >Id: {{user.data.uid}}</a>
            </li>
            <!-- <div class="nav-item">{{user.data.uid}}</div> -->

            <li class="nav-item">
              <a class="nav-link" @click.prevent="signOut">Sign out</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="register" class="nav-link">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link to="DataBaseTesting" class="nav-link">DataBaseTesting</router-link>
            </li>
          </template>
        </ul>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
import { mapGetters } from "vuex"
import firebase from "firebase"
export default {
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
          this.$router.replace({
            name: "home"
          })
        });
    }
  }
}
</script>
