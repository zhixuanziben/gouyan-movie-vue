<template>
  <div>
    <spinner v-if='guodu'></spinner>
    <h1>所有短评--{{commentsMsg.subject.title}}</h1>
    <div>
      <div v-for="item in commentsMsg.comments">
        <div>
          {{item.rating.value}}/{{item.created_at}}
        </div>
        <div>
          {{item.content}}
        </div>
        <div>
          <img :src="item.author.avatar" :alt="item.author.alt">
          {{item.author.name}}
          {{item.useful_count}}赞同
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
      spinner: spinner
    },
    mounted: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&count=20&client=something&udid=dddddddddddddddddddddd')
          .then(function (response) {
            this.guodu = false
            this.commentsMsg = response.body
            // console.log(JSON.stringify(response))
          })
          .catch(function (response) {
            console.log(response)
          })
    }
  }
</script>

<style>
  
</style>
