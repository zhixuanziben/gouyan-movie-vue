<template>
  <div>
    <spinner v-if='guodu'></spinner>
    <h1 v-if='!guodu'>'{{name}}'的搜索结果, 共{{search_result.total}}条信息</h1>
    <div v-if='!guodu' class="in-theaters-area">
      <div class="movies-wrap" >
        <div class="movies-show" v-for="(item, index) in search_result.subjects" @click="showMoreMsg">
          <p><router-link :to="'movie/'+ item.id"><img :src="item.images.small" :alt="item.alt"></router-link></p>
          <p>{{ item.title }}</p>
          <p v-if="item&&item.ratings&&item.ratings.average">{{ item.ratings.average }}</p>
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
            ratings: {
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
  .in-theaters-area {
    background-color: gray;
  }
  .movies-wrap {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    text-decoration: none;
  }
  .movies-show {
    flex-grow: 1;
    width: 30%;
    background-color: white;
    text-align: center;
    cursor: pointer;
  }
  .movies-show:hover {
    background-color: #58B7FF;
  }
  .movies-show p {
    font-size: 14px;
  }
</style>
