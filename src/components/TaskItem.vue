<template>
<div class="at-eg-task taskHover" :class="[classLength, classFloor]">
  <div class="at-eg-task-inner " @click.prevent="del">
  {{task.title}}
  </div>
  <div class="hover">
    {{task}}
  </div>
</div>
</template>

<script>

export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    floorIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    classLength () {
      return 'at-eg-len-' + this.task.duration
    },
    classFloor () {
      return 'at-eg-floor-' + this.floorIndex
    }
  },
  methods:{
    print(){
        

    },
    del(){
      // this.$destroy();
      // console.log(this.$el.parentNode)
      // remove the element from the DOM
      // this.$el.parentNode.removeChild(this.$el);
    }
  }
}

</script>

<style scoped lang="stylus">
  .taskHover:hover .hover{
    // display inline
    position absolute
    z-index 999999999
    width 500px
  }
    

  .hover{
    
    display none
    background-color:#ffb2b2;
  }
</style>


