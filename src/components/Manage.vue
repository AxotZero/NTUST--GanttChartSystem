<template>

  <div class="container" style="padding-top: 50px">

     <form action="#" @submit.prevent="addGanttChart">
        <div class="form-group row">
          <label for="email" class="col-md-4 col-form-label text-md-right">GanttChart Title</label>
        </div>
        <div class="form-group row">
          <!-- <label for="password" class="col-md-4 col-form-label text-md-right"></label> -->
          <div class="col-md-6">
            <input
              id="title"
              type="title"
              class="form-control"
              name="title"
              placeholder="Enter your gantt-chart title"
              value
              required
              autofocus
              v-model="form.title"
            />
            <!-- <input
              id="title"
              type="title"
              class="form-control"
              name="title"
              value
              required
              autofocus
              v-model="form.sdate"
            /> -->


          </div>
        </div>
        <div class="form-group row mb-0">
          <div class="col-md-8 offset-md-4">
            <button type="submit" class="btn btn-primary">Add GanttChart</button>
          </div>
        </div>
      </form>

      <!--  -->
      <!-- Own  -->
      <!--  -->
      <div class="own col-md-4">
        <div class="form-group row">
            <label for="email" class="col-form-label text-md-right">Own Gantt Chart</label>
        </div>
        <div class="form-group row" >
            <table border="1" class="ganttTable" style="width: 300px">
              <thead><td>title</td><td></td><td></td></thead>              
              <tbody>
                <tr v-for="x in ownGanttList">
                  <!-- <td>{{x.id}}</td> -->
                  <td>{{x.title}}</td>
                  <td><button type="button" @click="goto(x.id)">view</button></td>
                  <td><button type="button" @click="del(x.id)">delete</button></td>
                </tr>
              </tbody>
            </table>
            <!-- <b-table striped hover :items="ownGanttList">
              <template v-slot:cell(show_details)="row">
                <b-button @click="goto(x.id)">view</b-button>
              </template>
            </b-table> -->
        </div>
      </div>

      <!--  -->
      <!-- Managing-->
      <!--  -->
      <div class="managing col-md-4">
      <div class="form-group row">
          <label for="email" class="col-form-label text-md-right">Managing Gantt Chart</label>
      </div>
      <div class="form-group row">
          <table border="1" class="ganttTable"  style="width: 200px">
            <thead><td>title</td><td> </td></thead>
            <tbody>
              <tr v-for="x in managingGanttList">
                <!-- <td>{{x.id}}</td> -->
                <td>{{x.title}}</td>
                <td><button type="button" @click="goto(x.id)">view</button></td>
              </tr>
            </tbody>
          </table>
      </div>
      </div>

      <!--  -->
      <!-- Viewing  -->
      <!--  -->
      <div class="viewing col-md-4">
      <div class="form-group row">
          <label for="email" class="col-form-label text-md-right">Viewing Gantt Chart</label>
      </div>
      <div class="form-group row">
          <table border="1" class="ganttTable">
            <thead><td>id</td><td>title</td></thead>
            <tbody>
              <tr v-for="x in viewingGanttList">
                <td>{{x.id}}</td>
                <td>{{x.title}}</td>
              </tr>
            </tbody>
          </table>
      </div>
      </div>



  </div>
</template>


<script>
import firebase from 'firebase'
import { mapGetters, mapState } from "vuex";
// import Demo from './EasyGanttDemo'

var database = firebase.database();

function ganttChart(t, ownerName, uid, date){
  var nowDate = Date();
  return {
    title: t,
    creatDate : nowDate,
    lastEditData : nowDate,
    owner: {
      id: uid,
      name: ownerName,
    },
    sdate : "1",
  };
};
var ganttDatabaseUrl = '/Ganttchart';

export default {
  name: 'dashboard',
  data() {
    return {
      form : {
        title: "",
      },
      ownGanttList: [],
      managingGanttList: [],
      viewingGanttList: [],
    }
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
    ...mapState({
      OwnGanttChartURL(state){
        if(state.user.data != null)
        {
          return '/user/' + state.user.data.uid + '/OwnGanttChart';
        }
        return "___";
      },
      ManagingGanttChartURL(state){
        if(state.user.data != null)
        {
          return '/user/' + state.user.data.uid + '/ManagingGanttChart';
        }
        return "___";
      },

      ViewingGanttChartURL(state){
        if(state.user.data != null)
        {
          return '/user/' + state.user.data.uid + '/ViewingGanttChart';
        }
        return "___";
      },
    })
  },
  methods:{
    addGanttChart() {
      var me = this;
      var ganttId = database.ref(ganttDatabaseUrl).push(
        ganttChart(me.form.title, this.user.data.displayName, this.user.data.uid, this.form.sdate) ).key;

      database.ref(me.OwnGanttChartURL).push({
        id: ganttId,
        title: me.form.title,
      });
    },
    goto(id) {
      console.log("goto :"+id);
      this.$router.push({ path: `/dashboard/${id}` });
    },
    del(id) {
      var self = this;
      console.log(this.OwnGanttChartURL+'/'+id);
      // database.ref(this.OwnGanttChartURL+'/'+id).remove();
      database.ref(this.OwnGanttChartURL).once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          if(childSnapshot.val().id == id)
            database.ref(self.OwnGanttChartURL+"/"+childSnapshot.key).remove();
        });
      });
    }
  },
  watch: {

    OwnGanttChartURL: function(a, b){
      var me = this;
      database.ref(this.OwnGanttChartURL).on("value", function(getData){
          var temp = [];
          getData.forEach(function(child){
            temp.push(child.val());
          });
          me.ownGanttList = temp;
        });
    },
    ManagingGanttChartURL: function(a, b){
      var me = this;
      database.ref(this.ManagingGanttChartURL).on("value", function(getData){
          var temp = [];
          getData.forEach(function(child){
            temp.push(child.val());
          });
          me.managingGanttList = temp;
        });
    },
    ViewingGanttChartURL: function(a, b){
      var me = this;
      database.ref(this.ViewingGanttChartURL).on("value", function(getData){
          var temp = [];
          getData.forEach(function(child){
            temp.push(child.val());
          });
          me.viewingGanttList = temp;
        });
    },
  },
  mounted() {

      var me = this;
      database.ref(this.OwnGanttChartURL).on("value", function(getData){
          if(!getData.exists()){ return ;}
          var temp = [];
          getData.forEach(function(child){
            temp.push(child.val());
          });
          me.ownGanttList = temp;
      });

      database.ref(this.ManagingGanttChartURL).on("value", function(getData){
          if(!getData.exists()){ return ;}
          var temp = [];
          getData.forEach(function(child){
            temp.push(child.val());
          });
          me.managingGanttList = temp;
      });

      database.ref(this.ViewingGanttChartURL).on("value", function(getData){
          if(!getData.exists()){ return ;}
          var temp = [];
          getData.forEach(function(child){
            temp.push(child.val());
          });
          me.viewingGanttList = temp;
      });
  },
};

</script>

<style scoped lang="stylus">
  .ganttTable

  .own
    position absolute
    left 5%

  .managing
    position absolute
    left 40%

  .viewing
    position absolute
    left 75%

</style>
