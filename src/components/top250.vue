<template>
  <div class="top250">
    <spinner v-if='guodu'></spinner>
    <div class="top-theaters-area">
      <div class="top-movies-wrap" >
        <div class="top-movies-show" v-for="(item, index) in top250_data_body_subjects" @click="showMoreMsg">
          <p><router-link :to="'movie/'+ item.id"><img :src="item.images.small" :alt="item.alt"></router-link></p>
          <p>{{ item.title }}</p>
          <p>{{ item.rating.average }}</p>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import spinner from './spinner'
export default {
  name: 'top250',
  data () {
    return {
      guodu: true,
      top250_data: {},
      top250_data_body: {},
      top250_data_body_subjects: []
    }
  },
  components: {
    spinner: spinner
  },
  mounted: function () {
    this.$http.jsonp('http://api.douban.com/v2/movie/top250')
        .then(function (response) {
          this.guodu = false
          this.top250_data = response
          this.top250_data_body = response.body
          this.top250_data_body_subjects = response.body.subjects
        })
        .catch(function (response) {
          console.log(response)
        })
  },
  methods: {
    showMoreMsg: function () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    margin: 0;
    padding: 0;
  }
  h1 {
    text-align: center;
  }
  .top-theaters-area {
    background-color: gray;
  }
  .top-movies-wrap {
    text-decoration: none;
    font-size: 0;
  }
  .top-movies-show {
    width: 80%;
    margin: 0 auto;
    background-color: white;
    text-align: center;
    cursor: pointer;
    font-size: 0;
  }
  .top-movies-show:hover {
    background-color: #58B7FF;
  }
  .top-movies-show p {
    font-size: 14px;
  }
</style>
