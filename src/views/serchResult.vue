<template>
  <div class="result">
    <v-header></v-header>
    <loading v-if='loading'></loading>
    <div v-if='!loading' class="res-theaters-area">
      <div class="res-search-warp">
        <input id="inp" v-model="query" @keyup.enter="submit()">
        <span @click="submit()">搜索</span>
      </div>
      <div class="res-movies-wrap" >
        <div class="res-movies-show" v-for="(item, index) in search_result.subjects" @click="serch(item.id)">
          <div class="res-movies-show-child">
            <div><img :src="item.images.small" :alt="item.alt"></div>
            <div class="res-movieMsg">
              <h2>{{ item.title }}</h2>
              <star :score="item.rating.average"></star>
              <p>{{ item.rating.average }}分({{ item.collect_count }}评价)</p>
              <p>{{ item.year }}年</p>
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
import star from '../components/star/star'
  export default {
    data () {
      return {
        loading: true,
        query: '',
        val: '',
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
            directors: [{
              name: ''
            }],
            casts: [{
              name: '',
              id: ''
            }],
            collect_count: '',
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
      loading: loading,
      'v-header': vHeader,
      star: star
    },
    watch: {
      $route: 'showMoreMsg'
    },
    methods: {
      showMoreMsg: function () {
        this.val = this.$route.query.name
        const serchUrl = 'https://api.douban.com/v2/movie/search?q=' + this.val
        this.$http.jsonp(serchUrl)
        .then(function (response) {
          this.loading = false
          this.search_result = response.body
        })
        .catch(function (response) {
          console.log(response)
        })
      },
      serch: function (str) {
        const path = '/movie/' + str
        this.$router.push({path: path})
      },
      submit: function (query) {
        this.$router.push({path: '/serchResult', query: { name: this.query }})
        this.query = ''
      }
    }
  }
</script>

<style scoped>
  .res-search-warp {
    width: 100%;
    height: 45px;
    display: flex;
    font-size: 14px;
  }
  .res-search-warp input{
    margin: auto;
    height: 30px;
    box-sizing: border-box;
    background: #f5f5f5;
    border-radius: 3px;
    padding: 5px 8px;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    width: 80%;
    color: #111;
}
  .res-search-warp span {
    color: #333;
    width: 40px;
    margin: auto;
  }
  .res-movies-wrap {
    text-decoration: none;
    font-size: 0;
  }
  .res-movies-show {
    padding: 10px 20px;
    background-color: #f8f8f8;
    cursor: pointer;
    font-size: 0;
  }
  .res-movies-show-child {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #f4f4f4;
  }
  .res-movieMsg {
    flex: 1;
    padding-left: 20px;
    vertical-align: top;
  }
  .res-movieMsg h2 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 5px;
  }
  .res-movies-show p {
    font-size: 14px;
    line-height: 2;
    color: #666;
  }
</style>
