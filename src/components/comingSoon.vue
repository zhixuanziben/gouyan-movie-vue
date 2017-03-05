<template>
  <div class="come-soon">
    <spinner v-if='guodu'></spinner>
    <div class="co-theaters-area">
      <div class="co-movies-wrap" >
        <div class="co-movies-show" v-for="(item, index) in coming_soon_data_body_subjects" @click="showMoreMsg">
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
  .co-theaters-area {
    background-color: gray;
  }
  .co-movies-wrap {
    text-decoration: none;
    font-size: 0;
  }
  .co-movies-show {
    width: 80%;
    margin: 0 auto;
    background-color: white;
    text-align: center;
    cursor: pointer;
    font-size: 0;
  }
  .co-movies-show:hover {
    background-color: #58B7FF;
  }
  .co-movies-show p {
    margin: 0;
    font-size: 14px;
  }
</style>
