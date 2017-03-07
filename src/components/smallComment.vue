<template>
  <div>
    <spinner v-if='guodu'></spinner>
    <div v-if='!guodu'>
      <header class="smallCom-header-title">
        <div class="smallCom-back" @click="backLastPage">
          <div></div>
        </div>
        <div class="smallCom-title">短评--{{commentsMsg.subject.title}}</div>
        <div class="smallCom-back"></div>
      </header>
      <section class="all-smallCom"> 
        <div v-for="item in commentsMsg.comments" class="smallCom">
          <div class="smallCom-rating">
            <star :score="item.rating.value*2" class="smallCom-star"></star>
            <span class="">{{item.created_at}}</span>
          </div>
          <div class="smallCom-content">
            {{item.content}}
          </div>
          <div class="smallCom-author">
            <img :src="item.author.avatar" :alt="item.author.alt">
            <div class="smallCom-author-msg">
              <span class="smallCom-author-name">{{item.author.name}}</span>
              <span class="smallCom-agreecount">{{item.useful_count}}赞同</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import spinner from './spinner/spinner'
import star from './star/star'
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
      spinner: spinner,
      star: star
    },
    mounted: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd')
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
      backLastPage: function () {
        window.history.go(-1)
      }
    }
  }
</script>

<style>
  .smallCom-header-title {
    display: flex;
    height: 50px;
    width: 100%;
    background-color: #e54847;
    padding: 6px;
    box-sizing: border-box;
  }
  .smallCom-back {
    width: 50px;
    position: relative;
    cursor: pointer;
  }
  .smallCom-back > div {
    position: absolute;
    top: 12px;
    left: 12px;
    height: 13px;
    width: 13px;
    border: 2px solid #fff;
    border-width: 0 0 2px 2px;
    transform: rotate(45deg);
  }
  .smallCom-title {
    flex: 1;
    color: #fff;
    text-align: center;
    line-height: 2;
    font-size: 20px;
    overflow: hidden;
  }
  .all-smallCom {
    padding: 10px;
  }
  .smallCom {
    border-bottom: 1px solid #d6d3d3;
  }
  .smallCom-rating {
    margin-top: 10px;
    color: #999;
  }
  .smallCom-star {
    display: inline-block;
  }
  .smallCom-content {
    color: #333;
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .smallCom-author {
    display: flex;
    margin-bottom: 10px;
  }
  .smallCom-author img {
    height: 48px;
    width: 48px;
    border-radius: 24px;
  }
  .smallCom-author-msg {
    flex: 1;
    line-height: 48px;
    margin-left: 10px;
    color: #999;
  }
  .smallCom-agreecount {
    float: right;
    margin-right: 10px;
  }
</style>
