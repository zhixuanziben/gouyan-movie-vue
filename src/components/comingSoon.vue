<template>
  <div class="hello">
    <spinner v-if='guodu'></spinner>
    <div class="in-theaters-area">
      <div class="movies-wrap" >
        <div class="movies-show" v-for="(item, index) in coming_soon_data_body_subjects" @click="showMoreMsg">
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
  name: 'coming_soon',
  data () {
    return {
      coming_soon_data: {},
      coming_soon_data_body: {},
      coming_soon_data_body_subjects: [],
      guodu: true
    }
  },
  components: {
    spinner: spinner
  },
  mounted: function () {
    this.$http.jsonp('http://api.douban.com/v2/movie/coming_soon')
        .then(function (response) {
          this.guodu = false
          this.coming_soon_data = response
          this.coming_soon_data_body = response.body
          this.coming_soon_data_body_subjects = response.body.subjects
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
