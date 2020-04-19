<template>
  <div class="container">
    
    <!-- <hello></hello> -->
    <!-- <demo></demo> -->
    <demo></demo>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import localStorage from "./localStorage"
import demo from "./EasyGanttDemo"
export default {
  name: "dashboard",
  components: {
    localStorage,
    demo
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  }
}

</script>
