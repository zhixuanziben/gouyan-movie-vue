<template>
  <div class="in-theaters">
    <spinner v-if='guodu'></spinner>
    <div class="in-theaters-area">
      <div class="in-movies-wrap" >
        <div class="in-movies-show" v-for="(item, index) in in_theaters_data_body_subjects" @click="showMoreMsg">
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
  name: 'hello',
  data () {
    return {
      guodu: true,
      in_theaters_data: {},
      in_theaters_data_body: {},
      in_theaters_data_body_subjects: []
    }
  },
  components: {
    spinner: spinner
  },
  mounted: function () {
    this.$http.jsonp('http://api.douban.com/v2/movie/in_theaters')
        .then(function (response) {
          this.guodu = false
          this.in_theaters_data = response
          this.in_theaters_data_body = response.body
          this.in_theaters_data_body_subjects = response.body.subjects
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
  .in-theaters-area {
    background-color: gray;
  }
  .in-movies-wrap {
    text-decoration: none;
    font-size: 0;
  }
  .in-movies-show {
    width: 80%;
    margin: 0 auto;
    background-color: white;
    text-align: center;
    cursor: pointer;
    font-size: 0;
  }
  .in-movies-show:hover {
    background-color: #58B7FF;
  }
  .in-movies-show p {
    font-size: 14px;
  }
</style>
