<template>
  <div class="demo" style="padding-top: 100px">

      <button class="nav-link" @click.prevent="update">Update </button>
      <button class="nav-link back-button" @click.prevent="back">BackBack </button>
      <easy-gantt :sdate="sdate" :utasks="utasks" ref="easyGantt"></easy-gantt>

      <button class="open-button" @click.prevent="openForm">addTesk</button>
    
      <button class="open-editor-button" @click.prevent="openEditorForm">addEditor</button>

    <div class="form-popup" id="myForm">
      <form action="/action_page.php" class="form-container">

        <button type="button" class="btn cancel"   @click.prevent="closeForm">Close</button>
        <!-- <h3>Add Task</h3> -->

        <label for="taskname"><b>Task Name</b></label>
        <input type="text" placeholder="Task Name" name="taskname" v-model="addTaskForm.title" required>

        <label for="assigned"><b>Assigned To</b></label>
        <input type="text" placeholder="Name" name="assigned" v-model="addTaskForm.assigned" required>

        <label for="startTime"><b>Start Time</b></label>
        <input type="text" placeholder="Start Time" name="startTime" v-model="addTaskForm.startTime" required>

        <label for="duraction"><b>Duration</b></label>
        <input type="number" placeholder="Duration" name="duraction"v-model="addTaskForm.duration"  required>

        <label for="psw"><b>Description</b></label>
        <textarea name="info" cols="50" required v-model="addTaskForm.desc"></textarea>
        <!-- <input type="password" placeholder="Enter Password" name="psw"   required> -->

        <button type="submit" class="btn" @click.prevent="addTask">Add</button>

      </form>
    </div>


    

    <div class="editor-form-popup" id="editorForm">
      <form class="form-container">

        <button type="button" class="btn cancel"   @click.prevent="closeEditorForm">Close</button>
        <!-- <h3>Add Task</h3> -->

        <label for="EditorID"><b>editor id</b></label>
        <input type="text" placeholder="input editor id" name="idInput" v-model="addEditorForm.id"  required>

        <button type="submit" class="btn" @click.prevent="addEditor">Add</button>

      </form>
    </div>


  </div>





</template>

<script>
import moment from 'moment'
import EasyGantt from '@/components/EasyGantt'
import demoData from '../assets/data.json'
import firebase from 'firebase'

var database = firebase.database();

export default {
  data () {
    return {
      sdate: null,
      utasks: [],
      editor: [],
      viewer: [],
      owner: {},
      title: "",
      addTaskForm: {
        _id: 555,
        title: "",
        assigned: "",
        startTime: "",
        duration: 0,
        desc: "",
      },
      addEditorForm: {
        id:""
      },
      backLog: [],
      path: '/Ganttchart/'+this.$route.params.id,
    }
  },
  name: 'demo',
  components: {
    EasyGantt
  },


  methods: {

      openForm() {
        document.getElementById("myForm").style.display = "block";
      },

      closeForm() {
        document.getElementById("myForm").style.display = "none";
      },

      openEditorForm() {
        document.getElementById("editorForm").style.display = "block";
      },

      closeEditorForm() {
        document.getElementById("editorForm").style.display = "none";
      },


      check() {
        console.log(this.utasks);
      },

      truncateAddTaskForm() {
            this.addTaskForm = {
                _id: 555,
                title: "",
                assigned: "",
                startTime: "",
                duration: 0,
                desc: "",
            };
      },
      addTask() {
          console.log("addTask");
          var findSomeone = false;
          this.utasks.forEach((obj, idx) => {
            // console.log(obj);
            console.log("assigned to"+this.addTaskForm.assigned);
            if(obj.name == this.addTaskForm.assigned){
                this.backLog.push({itemId: idx, taskId: obj.tasks.length});
                obj.tasks.push({
                    _id: "12345687879",
                    title: this.addTaskForm.title,
                    desc: this.addTaskForm.desc,
                    duration: this.addTaskForm.duration,
                    sdate: this.addTaskForm.startTime,
                });
                // this.truncateAddTaskForm();
                findSomeone = true;
                return;
            }
          });
          if(findSomeone){
              return;
          }
          this.backLog.push({itemId: this.utasks.length, taskId: 0});

          this.utasks.push({
              _id: "123789456",
              avatar: "",
              name: this.addTaskForm.assigned,
              tasks: [
                  {
                    _id: "12345687879",
                    title: this.addTaskForm.title,
                    desc: this.addTaskForm.desc,
                    duration: this.addTaskForm.duration,
                    sdate: this.addTaskForm.startTime,
                }
              ],
          });
            // this.truncateAddTaskForm();
            console.log("add new");
      },

      addEditor() {
        var me = this;

        if (this.editor.find(function(element){ return element ==  me.addEditorForm.id;}) != undefined)
        {
          alert("editor already exist");
          return;
        }
        this.editor.push(this.addEditorForm.id);
        database.ref('/user/' + me.addEditorForm.id).once("value", function(getData){
          if(getData.exists()){
            me.editor.push(me.addEditorForm.id)
            database.ref('/user/' + me.addEditorForm.id + '/ManagingGanttChart').push({
              id: me.$route.params.id,
              title: me.title,
            });
            alert('add editor successfully')
            me.update();
          }
          else{
            alert("userId not found");
          }
        });
        // this.update();
      },

      back() {
          if(this.backLog.length < 1) return;
          var backIdx = this.backLog[this.backLog.length - 1];
          console.log(backIdx);

          this.backLog.splice(-1,1);
          if(backIdx.taskId == 0){
              this.utasks.splice(backIdx.itemId, 1);
          }
          else{
              this.utasks[backIdx.itemId].tasks.splice(backIdx.taskId, 1);
          }
      },

      update() {
        var me = this;
        var _task = me.utasks;
        var _editor = me.editor;
        var _viewer = me.viewer;
        var _title = me.title;
        if(_task == []) _task = undefined;
        if(_editor == []) editor = undefined;
        if(_viewer == []) viewer = undefined;

        database.ref(this.path).update({
          items: _task,
          editor: _editor,
          viewer: _viewer,
          title: _title,
        })
        alert("Update successfully");
      }



  },
  mounted () {


    var me = this;
    // console.log(this.$route.params.id);

    database.ref(this.path).on("value", function(getData){
        // console.log(getData.val());
        me.sdate = getData.val().sdate;
        me.owner = getData.val().owner;
        me.title = getData.val().title;
        if(getData.val().items == undefined) me.utasks = [];
        else me.utasks = getData.val().items;

        if(getData.val().editor == undefined) me.editor = [];
        else me.editor = getData.val().editor;

        if(getData.val().viewer == undefined) me.viewer = [];
        else me.viewer = getData.val().viewer;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .demo
    margin-bottom 50px
    margin-left auto
    margin-right auto
    max-width 1440px
    padding 2em 1em
    overflow auto
  .form
    position absolute
    right 0
    background-color #6C6C6C

  * {box-sizing: border-box;}

/* Button used to open the contact form - fixed at the bottom of the page */

.back-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  top: 73px;
  left: 28px;
  width: 280px;
  z-index: 9;
}



.open-button {
  background-color: #D26900;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  top: 73px;
  left: 350px;
  width: 280px;
  z-index: 9;
}

.open-editor-button {
  background-color: #D26900;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  top: 73px;
  left: 700px;
  width: 280px;
  z-index: 9;
}

.editor-form-popup {
  display: none;
  position: fixed;
  top: 73px;
  left: 700px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

/* The popup form - hidden by default */
.form-popup {
  display: none;
  position: fixed;
  top: 73px;
  left: 350px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

/* Full-width input fields */
.form-container input[type=text], .form-container input[type=number], .form-container textarea {
  width: 100%;
  padding: 10px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}

/* When the inputs get focus, do something */
.form-container input[type=text]:focus, .form-container input[type=number]:focus, .form-container textarea:focus {
  background-color: #ddd;
  outline: none;
}




/* Set a style for the submit/login button */
.form-container .btn {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}


</style>
