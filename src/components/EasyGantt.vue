<template>
<div class="at-eg">
  <div class="at-eg-hd">
    <table cellpadding="0" cellspacing="0" border="0" class="at-eg-tb">
      <thead>
        <tr>
          <th class="at-eg-cell-first">
            <div v-show="isLoading" class="at-eg-spinner">
              <slot name="spinner">
                <i :class="'at-eg-spinner-' + spinner"></i>
              </slot>
            </div>
            <div v-show="!isLoading" class="at-eg-cell-first-inner">#</div>
          </th>
          <th v-for="date in dates" style="color:Black">
            {{ date }}
          </th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="at-eg-bd">
    <table class="at-eg-tb at-eg-tasks">
      <tbody>
        <template v-for="(obj, idx) in egtasks">
          <user-tasks :user="obj.user" :tasks="obj.tasks" :dates="dates" :cls="idx % 2 === 0 ? 'at-eg-odd' : ''"></user-tasks>
        </template>
      </tbody>
    </table>
  </div>
</div>
</template>

<style lang="stylus" src="../styles/style.styl"></style>

<script>
import UserTasks from './UserTasks.vue'
import UserTaskParser from './UserTaskParser'
import moment from 'moment'

const momentHelper = {
  getMoment (date) {
    let cache = momentHelper[date]
    if (cache) return cache
    return moment(date)
  }
}



export default {
  data () {
    return {
      dates: [],
      isLoading: false,
      // utasks: [],
      firstDate: "",
      lastDate: "",
    }
  },
  props: {
    utasks: {
      type: Array,
      default: []
    },
    sdate: String,
    spinner: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    egtasks () {
      this.getDate();
      var me = this;
      let items = []
      this.utasks.forEach((obj, idx) => {
        let utp = new UserTaskParser(obj.tasks, this.sdate, this.firstDate, this.lastDate)
        let data = {}
        data.user = obj
        data.tasks = utp.items
        data.total = utp.total
        this.dates = utp.dates
        items.push(data)
      });
      return items;
    },
    
  },
  components: {
    UserTasks
  },
  created () {
    this.isLoading = true
  },
  updated () {
    this.isLoading = false
  },
  methods: {
    getDate(){
      var me = this;
      this.utasks.forEach((obj1,idx1) => {
        obj1.tasks.forEach((obj, idx) => {
          // console.log(obj.sdate);
          // console.log(obj.duration);
          
          var getDate = moment(obj.sdate);
          var getLastDate = moment(obj.sdate).add(obj.duration, "days");

          if(me.firstDate == ""){
            me.firstDate = getDate;
            me.lastDate = getLastDate;
          }
          else{
            // console.log(obj.sdate);
            if(getDate.isBefore(me.firstDate)){
              me.firstDate = getDate;
            }
            if(!getLastDate.isBefore(me.lastDate))
            {
              me.lastDate = getLastDate;
            }
          }
        })
      })
      // console.log(this.firstDate);
      // console.log(this.lastDate);
    },
  }


}

</script>
