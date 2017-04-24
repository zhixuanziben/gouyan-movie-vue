<template>
  <div>
    <loading v-if='loading'></loading>
    <div v-if='!loading'>
      <v-header></v-header>
      <banner-bg></banner-bg>
      <section class="subject">
        <span>{{commentsMsg.subject.title}}</span>
      </section>
      <section class="title-wrapper">
        <h1>全部影评</h1>
      </section>
      <section class="all-shortCommentary">
        <div v-for="item in commentsMsg.comments" class="shortCommentary">
          <div class="shortCommentary-rating">
            <img :src="item.author.avatar" :alt="item.author.alt">
            <div class="author-info">
              <span class="shortCommentary-author-name">{{item.author.name}}</span>
              <star :score="item.rating.value*2" class="shortCommentary-star"></star>
            </div>
          </div>
          <div class="shortCommentary-content">
            {{item.content}}
            <div class="shortCommentary-agreecount">{{item.useful_count}}赞同</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import vHeader from '../components/header/header'
import bannerBg from '../components/header/banner_bg'
import loading from '../components/loading/loading'
import star from '../components/star/star'
  export default {
    data () {
      return {
        loading: true,
        commentsMsg: {
          comments: [{
            rating: {
              max: '',
              value: ''
            },
            useful_count: '',
            author: {
              name: '',
              avatar: '',
              alt: '',
              signature: '',
              id: ''
            },
            created_at: '',
            content: ''
          }],
          total: '',
          subject: {
            title: ''
          }
        }
      }
    },
    components: {
      loading: loading,
      star: star,
      'v-header': vHeader,
      'banner-bg': bannerBg
    },
    mounted: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd')
          .then(function (response) {
            this.loading = false
            this.commentsMsg = response.body
            // console.log(JSON.stringify(response))
          })
          .catch(function (response) {
            console.log(response)
          })
    },
    methods: {
      backLastPage: function () {
        window.history.go(-1)
      }
    }
  }
</script>

<style>
  .all-shortCommentary {
    padding: 15px;
  }
  .shortCommentary-rating {
    position: relative;
    margin-top: 10px;
    color: #999;
    height: 50px;
  }
  .author-info {
    position: relative;
    top: -35px;
    left: 50px;
    width: 180px;
    color: #ccc;
    font-size: 12px;
  }
  .shortCommentary-rating img {
    width: 36px;
    border-radius: 50%;
    vertical-align: text-top;
    margin-right: 10px;
  }
  .shortCommentary-author-name {
    font-size: 15px;
    display: inline-block;
    vertical-align: text-top;
    margin-top: -3px;
    margin-right: 6px;
    color: #494949;
    font-weight: bold;
  }
  .shortCommentary-star {
    display: inline-block;
    vertical-align: text-top;
  }
  .shortCommentary-content {
    padding-left: 40px;
    color: #494949;
    font-size: 15px;
    line-height: 22px;
    margin-bottom: 10px;
  }
  .shortCommentary-agreecount {
    text-align: left;
    font-size: 14px;
    color: #ccc;
    margin: 10px 0 20px 0;
  }
</style>
