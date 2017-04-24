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
      <section class="cinecism-wrap">
        <div v-for="(item, index) in commentsMsg.reviews" class="cinecism-content">
          <h3>{{item.title}}</h3>
          <div class="cinecism-content-header">
            <img :src="item.author.avatar" :alt="item.author.alt">
            <span class="smallCom-author-name">{{item.author.name}}</span>
            <star :score="item.rating.value*2" class="cinecism-star"></star>
          </div>
          <div @click="showContent(index)" class="abstract">
            {{item.summary}}
          </div>
          <div @click="showSummary" v-if="commentsMsg.reviews[index].contentShow">
            {{item.content}}
          </div>
          <footer>
            {{item.useful_count}}有用
          </footer>
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
          reviews: [{
            rating: {
              max: '',
              value: ''
            },
            author: {
              name: '',
              avatar: '',
              alt: '',
              signature: '',
              id: ''
            },
            contentShow: false,
            summaryShow: true,
            created_at: '',
            title: '',
            updated_at: '',
            share_url: '',
            summary: '',
            content: '',
            useful_count: ''
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
      this.$http.jsonp('https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=20&client=something&udid=dddddddddddddddddddddd')
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
      showContent: function (ind) {
        // console.log(typeof this.commentsMsg.reviews[ind].contentShow)
        // this.commentsMsg.reviews[ind].contentShow = true
        // console.log(this.commentsMsg.reviews[ind].contentShow)
      },
      showSummary: function () {
        this.commentsMsg.reviews.summaryShow = !this.commentsMsg.reviews.summaryShow
      },
       backLastPage: function () {
        window.history.go(-1)
      }
    }
  }
</script>

<style>
  .subject {
    border-bottom: 1px solid #f4f4f4;
    padding: 10px 0 10px 10px;
  }
  .subject span {
    color: #42bd56;
    font-size: 16px;
    line-height: 24px;
  }
  .title-wrapper {
    border-bottom: 1px solid #f4f4f4;
  }
  .title-wrapper h1 {
    font-size: 24px;
    line-height: 32px;
    margin: 15px 0 15px 10px;
    word-break: break-all;
  }
  .cinecism-content {
    padding: 15px;
  }
  .cinecism-content h3 {
    font-size: 17px;
    color: #494949;
    font-weight: 500;
    line-height: 1.41;
    margin: 5px 0 5px;
  }
  .cinecism-content img {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    vertical-align: middle;
    margin-right: 5px;
  }
  .cinecism-content-header {
    display: flex;
    margin: 10px 0 10px;
  }
  .cinecism-content-header span {
    align-self: center;
  }
  .cinecism-content-header-rating {
    flex: 1;
    margin-left: 10px;
  }
  .abstract, .cinecism-content footer {
    color: #aaaaaa;
    font-size: 12px;
    line-height: 1.5;
  }
  .cinecism-content footer {
    margin: 10px 0 0;
    text-align: left;
  }
  .cinecism-star {
    display: inline-block;
    line-height: 20px;
    vertical-align: text-top;
  }
</style>
