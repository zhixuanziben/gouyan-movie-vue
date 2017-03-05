<template>
  <div class="result">
    <spinner v-if='guodu'></spinner>
    <h1 v-if='!guodu' class="title">'{{val}}'的搜索结果, 共{{search_result.total}}条信息</h1>
    <div v-if='!guodu' class="res-theaters-area">
      <div class="res-movies-wrap" >
        <div class="res-movies-show" v-for="(item, index) in search_result.subjects" @click="serch(item.id)">
          <div class="res-movies-show-child">
            <div><img :src="item.images.small" :alt="item.alt"></div>
            <div class="res-movieMsg">
              <h2>{{ item.title }}</h2>
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
import spinner from './spinner'
  export default {
    data () {
      return {
        guodu: true,
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
      spinner: spinner
    },
    watch: {
      $route: 'showMoreMsg'
    },
    methods: {
      showMoreMsg: function () {
        this.val = this.$route.query.name
        const serchUrl = 'http://api.douban.com/v2/movie/search?q=' + this.val
        this.$http.jsonp(serchUrl)
        .then(function (response) {
          this.guodu = false
          this.search_result = response.body
        })
        .catch(function (response) {
          console.log(response)
        })
      },
      serch: function (str) {
        const path = '/movie/' + str
        this.$router.push({path: path})
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
    padding: 10px 20px;
    background-color: white;
    cursor: pointer;
    font-size: 0;
  }
  .res-movies-show-child {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ece9e9;
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
    color: #837979;
  }
  .title {
    font-size: 20px;
    font-weight: 700;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    background-color: #f2fbfb;
  }
</style>
