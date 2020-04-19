<template>
  <div>
    <form>
    <input type="text" v-model="name"/>{{name}}<br/>
    <input type="text" v-model="last"/>{{last}}<br/>
    <input type="text" v-model="index"/>{{index}}<br/>
    <select v-model="grade">
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
    </select>
    {{grade}}
    <button type="button" v-on:click="add()">Add To Table</button>
    <button type="button" v-on:click="saveFile()">saveFile</button>
    </form>
    <table border="1">
        <thead><td>Name</td><td>Last Name</td><td>Index</td><td>Grade</td></thead>
        <tbody>
        <tr v-for="x in arr">
            <td>{{x.first}}</td>
            <td>{{x.lastn}}</td>
            <td>{{x.index}}</td>
            <td>{{x.grade}}</td>
        </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "hello",
  data () {
    return {
      name: "",
      last: "",
      index: 0,
      grade: 0,
      arr: []
    }
  },
  methods: {
    add: function (e) {
      this.arr.push({first: this.name, lastn: this.last, index: this.index, grade: this.grade})
      console.log(1)
    },
    saveFile: function () {
      const data = JSON.stringify(this.arr)
      window.localStorage.setItem("arr", data)
      console.log(JSON.parse(window.localStorage.getItem("arr")))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a
  color: #fff
  text-decoration none
  &:hover
    text-decoration underline

</style>
