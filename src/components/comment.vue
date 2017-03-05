<template>
  <div>
    <spinner v-if='guodu'></spinner>
    <h1>所有长评--{{commentsMsg.subject.title}}</h1>
    <div>
      <div v-for="item in commentsMsg.reviews">
        <h2>{{item.title}}</h2>
        <div>
          <img :src="item.author.avatar" :alt="item.author.alt">{{item.author.name}}/{{item.rating.value}}/{{item.created_at}}
        </div>
        <div @click="showContent">
          {{item.summary}}
          <p>^</p>
        </div>
        <div @click="showSummary">
          {{item.content}}
        </div>
        <div>
          {{item.useful_count}}赞同
          {{item.useless_count}}反对
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
            useless_count: '',
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
      spinner: spinner
    },
    mounted: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=20&client=something&udid=dddddddddddddddddddddd')
          .then(function (response) {
            this.guodu = false
            this.commentsMsg = response.body
            // console.log(JSON.stringify(response))
          })
          .catch(function (response) {
            console.log(response)
          })
    },
    methods: {
      showContent: function () {
        this.commentsMsg.reviews.contentShow = !this.commentsMsg.reviews.contentShow
      },
      showSummary: function () {
        this.commentsMsg.reviews.summaryShow = !this.commentsMsg.reviews.summaryShow
      }
    }
  }
</script>

<style>
  
</style>
