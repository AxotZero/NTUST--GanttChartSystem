<template>
  <div class="container" style="padding-top: 50px">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <!-- data write -->
        <div class="card">
          <div class="card-header">Write</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                <div class="col-md-6">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="deposit" class="col-md-4 col-form-label text-md-right">Deposit</label>

                <div class="col-md-6">
                  <input
                    id="deposit"
                    type="deposit"
                    class="form-control"
                    name="deposit"
                    value
                    required
                    autofocus
                    v-model="form.deposit"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="number" class="col-md-4 col-form-label text-md-right">number</label>

                <div class="col-md-6">
                  <input
                    id="number"
                    type="number"
                    class="form-control"
                    name="number"
                    required
                    v-model="form.number"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-6">
                  <button type="submit" class="btn btn-primary">submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- data real time read -->
        <div class="card">
          <div class="card-header">Read</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="get">
              <div class="form-group row">
                <label for="getName" class="col-md-4 col-form-label text-md-right">Name</label>
                <div class="col-md-6">
                  <input
                    id="getName"
                    type="getName"
                    class="form-control"
                    name="getName"
                    value
                    required
                    autofocus
                    v-model="getName"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-6">
                  <button type="get" class="btn btn-primary">Get Data</button>
                </div>
              </div>
            </form>
              <div class="form-group row">
                <label for="getDeposit" class="col-md-4 col-form-label text-md-right">getDeposit</label>
                <p>{{form2.deposit}}</p>
              </div>

              <div class="form-group row">
                <label for="number" class="col-md-4 col-form-label text-md-right">getNumber</label>
                <p>{{form2.number}}</p>
              </div>
          </div>
        </div>

        <!-- data with class and array -->
                <div class="card">
          <div class="card-header">Class and Array</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="addGanttChart">
              <div class="form-group row">
                <label for="ganttChartTitle" class="col-md-4 col-form-label text-md-right">Title</label>
                <div class="col-md-6">
                  <input
                    id="ganttChartTitle"
                    type="ganttChartTitle"
                    class="form-control"
                    name="ganttChartTitle"
                    value
                    required
                    autofocus
                    v-model="ganttChartTitle"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-6">
                  <button type="get" class="btn btn-primary">Add ganttChart</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
// import {database} from "../index";

var database = firebase.database();

function ganttChart(t, name){
  return {
    title: t,
    date : Date(),
    Owner: name
  };
};

export default {
  data() {
    return {
      form: {
        name: "",
        deposit: "",
        number: "",
      },
      getName: "",
      
      error: null,
      form2: {
        deposit: "",
        number: "",
      },

      ganttChartTitle: "",
    };
  },
  methods: {
    
    submit() {
        // this.form2.deposit = this.form.deposit;
        database.ref('/DataBaseTest/'+ this.form.name).set({
            deposit: this.form.deposit,
            number : this.form.number 
        });
        console.log('submit');
    },
    get(){
      var me = this;
      database.ref('/DataBaseTest/'+ this.getName).once("value", function(getData){
        me.form2.deposit = getData.val().deposit;
        me.form2.number = getData.val().number;
      });
      console.log('get');
    },
    addGanttChart() {
      var me = this;
      var gantt = ganttChart(this.ganttChartTitle, "axot");
      var id = database.ref('/GanttChart/').push(ganttChart(this.ganttChartTitle, "axot")).key;
      // database.ref('user')
      console.log('add '+ id);
    },
    mounted() {
      console.log(111);
      var me = this;
      axotDataBase.on("value", function(getData){
        me.form2.deposit = getData.val().deposit;
        me.form2.number = getData.val().number;
      });
    },
  }
};

</script>