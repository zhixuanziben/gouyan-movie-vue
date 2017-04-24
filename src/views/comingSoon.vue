<template>
  <div class="come-soon">
    <v-header></v-header>
    <div class="v-nav-bar">
      <router-link to="/inTheaters" class="v-nav">影院热映</router-link>
      <router-link to="/comingSoon" class="v-nav">新片速递</router-link>
    </div>
    <loading v-if='loading'></loading>
    <div v-if='!loading' class="co-theaters-area">
      <div class="co-movies-wrap" >
        <div class="co-movies-show" v-for="(item, index) in coming_soon_data_body_subjects" @click="showMoreMsg(item.id)">
          <div class="co-movies-show-child">
            <div class="co-posters"><img :src="item.images.medium" :alt="item.alt"></div>
            <div class="co-movieMsg">
              <h2>{{ item.title }}</h2>
              <p>类型: {{item.genres.join(', ')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loading from '../components/loading/loading'
import vHeader from '../components/header/header'
export default {
  name: 'coming_soon',
  data () {
    return {
      coming_soon_data: {},
      coming_soon_data_body: {},
      coming_soon_data_body_subjects: [],
      loading: true
    }
  },
  components: {
    loading: loading,
    'v-header': vHeader
  },
  mounted: function () {
    this.$http.jsonp('https://api.douban.com/v2/movie/coming_soon')
        .then(function (response) {
          this.loading = false
          this.coming_soon_data = response
          this.coming_soon_data_body = response.body
          this.coming_soon_data_body_subjects = response.body.subjects
        })
        .catch(function (response) {
          console.log(response)
        })
  },
  methods: {
    showMoreMsg: function (str) {
      const path = '/movie/' + str
      this.$router.push({path: path})
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
 .co-movies-wrap {
    text-decoration: none;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
  }
  .co-movies-show {
    width: 30%;
    margin: 10px 3px 10px 7px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 0;
  }
  .co-movies-show-child {
    -moz-box-shadow: 0px 5px 5px #888888;
    box-shadow: 0px 5px 5px #888888;
  }
  .co-posters img{
    width: 100%;
    height: 160px;
  }
  .co-movieMsg p, h2 {
    color: #000;
    text-align: center;
    max-width: 100px;
    overflow: hidden;
    white-space: nowrap;
    word-wrap: nowrap;
    text-overflow: ellipsis;
  }
  h2 {
    font-size: 15px;
    padding-left: 5px;
  }
  .co-movieMsg p {
    font-size: 13px;
  }
  .v-nav-bar {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    background-color: #fff;
  }
  .v-nav {
    flex: 1;
    text-align: center;
    text-decoration: none;
    height: 35px;
    line-height: 35px;
    font-size: 17px;
    color: #000;
  }
</style>
