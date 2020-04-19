<template>
<tr class="at-eg-row" :class="cls">
  <td class="at-eg-cell-a">
    <div class="at-eg-user">
      <div class="at-eg-user-inner">
        <img :src="imgSrc" :alt="user.name" class="at-eg-avatar" style="width: 75px"/>
        <p class="at-eg-name">{{user.name}}</p>
      </div>
    </div>
  </td>
  <td class="at-eg-cell-b" v-for="(date, idx) in dates" :data-date="date" :class="'at-eg-cell-' + idx">
    <div class="at-eg-tgroup" :class="'at-eg-tall-' + tallSize">
      <template v-for="(obj, idx1) in tasks">
        <div @click.prevent="del(idx1)">
          <task-item :task="task" :floor-index="idx1" v-if="task = obj[date]" ></task-item>
        </div>
      </template>
    </div>
  </td>
</tr>
</template>

<script>
import TaskItem from './TaskItem.vue'
export default {
  data(){
    return{
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiNCN7eBfGkK-mXG48UlT6G8JE-s8r8ayWLKzRR7RJ2eN-52vw&s"
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    dates: {
      type: Array,
      required: true
    },
    tasks: {
      type: Array,
      required: true
    },
    cls: {
      type: String
    }
  },
  computed: {
    tallSize () {
      return this.tasks.length
    }
  },
  components: {
    TaskItem
  },
  methods: {
    del(idx){
      console.log(this.tasks);

      // this.tasks.splice(idx,1);
      // console.log(this.tasks);
      // console.log(idx);
    }
  }

 
}
 
</script>
