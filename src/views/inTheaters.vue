<template>
  <div class="in-theaters">
    <v-header ></v-header>
    <div class="v-nav-bar">
      <router-link to="/inTheaters" class="v-nav">影院热映</router-link>
      <router-link to="/comingSoon" class="v-nav">新片速递</router-link>
    </div>
    <div v-if='!loading' class="in-theaters-area">
      <div class="in-movies-wrap" >
        <div class="in-movies-show" v-for="(item, index) in in_theaters_data_body_subjects" @click="showMoreMsg(item.id)">
          <div class="in-movies-show-child">
            <div class="posters">
              <img :src="item.images.medium" :alt="item.alt">
            </div>
            <div class="movieMsg">
              <h2>{{ item.title }}</h2>
              <div class="rank">
                  <star class="movieMsg-star" :score="item.rating.average"></star>
                  <span>{{ item.rating.average.toFixed(1) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-if='loading'></loading>
  </div>
</template>

<script>
import loading from '../components/loading/loading'
import vHeader from '../components/header/header'
import star from '../components/star/star'

export default {
  name: 'hello',
  data () {
    return {
      loading: true,
      in_theaters_data: {},
      in_theaters_data_body: {},
      in_theaters_data_body_subjects: []
    }
  },
  components: {
    loading: loading,
    'v-header': vHeader,
    star: star
  },
  mounted: function () {
    this.$http.jsonp('https://api.douban.com/v2/movie/in_theaters')
        .then(function (response) {
          this.loading = false
          this.in_theaters_data = response
          this.in_theaters_data_body = response.body
          this.in_theaters_data_body_subjects = response.body.subjects
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

<style scoped>
  body {
    margin: 0;
    padding: 0;
  }
  .in-movies-wrap {
    text-decoration: none;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
  }
  .in-movies-show {
    width: 30%;
    margin: 10px 3px 10px 7px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 0;
  }
  .in-movies-show-child {
    -moz-box-shadow: 0px 5px 5px #888888;
    box-shadow: 0px 5px 5px #888888;
  }
  .posters img{
    width: 100%;
    height: 160px;
  }
  h2 {
    font-size: 15px;
    color: #000;
    padding-left: 5px;
    text-align: center;
    max-width: 100px;
    overflow: hidden;
    white-space: nowrap;
    word-wrap: nowrap;
    text-overflow: ellipsis;
  }
  .rank {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 12px;
    line-height: 18px;
  }
  .rank span {
    display: block;
    margin-top: -2px;
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
