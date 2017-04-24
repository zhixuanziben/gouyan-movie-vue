<template>
  <div>
    <div class="v-header">
      <div class="v-load-title">
        <a href="/inTheaters">豆瓣电影</a>
      </div>
      <div class="v-header-search" @click="search">
        <img src="../../assets/img/search.png">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        query: ''
      }
    },
    methods: {
      search: function () {
        this.$router.push({path: '/searchPage'})
      }
    }
  }
</script>

<style scoped>
  .v-header {
    display: flex;
    flex-flow: row wrap;
    height: 50px;
    padding: 10px 10px;
    box-sizing: border-box;
    background-color: #fff;
    overflow: hidden;
    border-bottom: 1px solid #f3f3f3;
  }
  .v-header-search {
    width: 50px;
    position: absolute;
    top: 5px;
    right: 0px;
  }
  .v-load-title a {
    font-size: 24px;
    font-weight: normal;
    line-height: 30px;
    letter-spacing: 1px;
    color: #00b600;
  }
  .v-load-title a:link {
    text-decoration: none;
  }
</style>
