<template>
  <div>
    <div class="search-wrap">
      <input id="inp" v-model="query" @keyup.enter="submit()">
      <span @click="notSubmit()">取消</span>
    </div>
    <div class="hot-search">
      <h3>热门搜索</h3>
      <button v-for="item in hotSearch" @click="serch(item.id)">{{item.name}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        query: '',
        hotSearch: [
          {name: '金刚狼3', id: '25765735'},
          {name: '一条狗的使命', id: '6873143'},
          {name: '生化危机:终章', id: '20471852'},
          {name: '乐高蝙蝠侠', id: '26145033'},
          {name: '爱乐之城', id: '25934014'},
          {name: '欢乐好声音', id: '26354572'}
        ]
      }
    },
    methods: {
      submit: function () {
        this.$router.push({path: '/serchResult', query: { name: this.query }})
        this.query = ''
      },
      serch: function (str) {
        const path = '/movie/' + str
        this.$router.push({path: path})
      },
      notSubmit: function () {
        window.history.go(-1)
      }
    }
  }
</script>

<style>
  .search-wrap {
    display: flex;
    padding: 10px;
    height: 30px;
  }
  .search-wrap input {
    flex: 1;
    text-decoration: none;
    border: 1px solid #E5E9F2;
    border-radius: 15px;
    padding-left: 2em;
  }
  .search-wrap span {
    margin-left: 10px;
    font-size: 15px;
    align-self: center;
    cursor: pointer;
  }
  .hot-search {
    padding: 10px;
  }
  .hot-search h3 {
    font-size: 16px;
  }
  .hot-search button {
    background-color: white;
    border-style: none;
    padding: 5px;
    margin-right: 5px;
    border-radius: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
    color: #e54847;
  }
</style>
