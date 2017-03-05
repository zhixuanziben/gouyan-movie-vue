<template>
  <div class="result">
    <spinner v-if='guodu'></spinner>
    <h1 v-if='!guodu'>'{{name}}'的搜索结果, 共{{search_result.total}}条信息</h1>
    <div v-if='!guodu' class="res-theaters-area">
      <div class="res-movies-wrap" >
        <div class="res-movies-show" v-for="(item, index) in search_result.subjects" @click="showMoreMsg">
          <p><router-link :to="'movie/'+ item.id"><img :src="item.images.small" :alt="item.alt"></router-link></p>
          <p>{{ item.title }}</p>
          <p>{{ item.rating.average }}分</p>
          <p>{{ item.year }}</p>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import spinner from './spinner'
  export default {
    data () {
      return {
        guodu: true,
        name: '',
        search_result: {
          total: '',
          subjects: [{
            rating: {
              max: '',
              average: ''
            },
            genres: [],
            title: '',
            year: '',
            images: {
              small: '',
              large: '',
              medium: ''
            },
            alt: '',
            id: ''
          }]
        }
      }
    },
    created: function () {
      this.showMoreMsg()
    },
    components: {
      spinner: spinner
    },
    watch: {
      $route: 'showMoreMsg'
    },
    methods: {
      showMoreMsg: function () {
        this.name = this.$route.query.name
        const serchUrl = 'http://api.douban.com/v2/movie/search?q=' + this.name
        this.$http.jsonp(serchUrl)
        .then(function (response) {
          this.guodu = false
          this.search_result = response.body
        })
        .catch(function (response) {
          console.log(response)
        })
      }
    }
  }
</script>

<style>
  .res-theaters-area {
    background-color: gray;
    font-size: 0;
  }
  .res-movies-wrap {
    text-decoration: none;
    font-size: 0;
  }
  .res-movies-show {
    width: 80%;
    margin: 0 auto;
    background-color: white;
    text-align: center;
    cursor: pointer;
    font-size: 0;
  }
  .res-movies-show:hover {
    background-color: #58B7FF;
  }
  .res-movies-show p {
    font-size: 14px;
  }
</style>
