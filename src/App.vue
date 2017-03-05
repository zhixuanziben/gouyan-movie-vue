<template>
  <div id="app">
    <header>
      <div class="back" @click="backIndex">电影</div>
      <button @click='ceshi'>测试</button>
      <div class="serch" @keyup.enter="serch()">
        <input type="text" v-model.trim="query" placeholder="请输入电影名"></input>
        <button type="submit" @click="serch()"></button>
      </div>
    </header>
    <div class="nav-bar" v-if="headerShow">
      <router-link to="/inTheaters" class="nav">正在热映</router-link>
      <router-link to="/comingSoon" class="nav">即将上映</router-link>
      <router-link to="/top250" class="nav">TOP250</router-link>
    </div>
    <router-view class='show'></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      query: '',
      headerShow: true
    }
  },
  methods: {
    backIndex: function () {
      this.$router.push({path: '/inTheaters'})
    },
    serch: function (str) {
      this.$router.push({path: '/serchResult', query: { name: this.query }})
      this.query = ''
    },
    ceshi: function () {
      this.$http.jsonp('http://api.douban.com/v2/movie/search?q=张艺谋')
        .then(function (response) {
          console.log(JSON.stringify(response))
        })
        .catch(function (response) {
          console.log(response)
        })
    }
  }
}
</script>

<style>
#app {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: scroll;
  font-family: 'FontAwesome', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #E5E9F2;
  color: #2c3e50;
}
header {
  height: 50px;
  position: relative;
}
.back {
  position: absolute;
  left: 5%;
  top: 50%;
  margin-top: -15px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  text-align: center;
  background-color: #20A0FF;
  cursor: pointer;
}
.serch {
  position: absolute;
  top: 50%;
  right: 5%;
  margin-top: -15px;
}
.serch input {
  width: 100%;
  height: 30px;
  padding-left: 10px;
  border: 2px solid #20A0FF;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
  background-color: #F9FAFC;
  color: #324057;
}
.serch button {
  position: absolute; 
  top: 0;
  right: 0px;
  padding-left: 10px;
  padding-right: 10px;
  height: 30px;
  border: none;
  background: #20A0FF;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}
.serch button:before {
  content: "serch!";
  font-family: FontAwesome;
  font-size: 16px;
  color: #D3DCE6;
}
.nav-bar {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  background-color: #20A0FF;
}
.nav {
  flex: 1;
  text-align: center;
  text-decoration: none;
  height: 50px;
  line-height: 50px;
  font-size: 25px;
  color: #F9FAFC;
}
.nav:hover {
  background-color: #1D8CE0;
}
</style>
