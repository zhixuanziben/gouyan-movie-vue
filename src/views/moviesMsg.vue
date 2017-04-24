<template>
  <div>
    <loading v-if='loading'></loading>
    <div v-if='!loading'>
      <v-header></v-header>
      <banner-bg></banner-bg>
      <section class="msg-movie">
        <div class="msg-movie-intro">
          <h1 class="msg-movie-title">{{movieMsg.title}}</h1>
          <div class="msg-movie-rating">
              <star :score="movieMsg.rating.average"></star>
              <strong>{{movieMsg.rating.average}}</strong>
              <span class="msg-movie-count">{{movieMsg.collect_count}}人评分</span>
          </div>
          <p>{{movieMsg.genres.join('/ ')}}</p>
          <p class="msg-star" v-for="item of movieMsg.directors">/ {{item.name}}(导演)</p>
          <p v-for="item of movieMsg.casts">{{item.name}} /</p>
          <p>{{movieMsg.year}}年上映</p>
          <p class="open-douban-app">
            <a href="https://www.douban.com/doubanapp/app?model=B&amp;copy=1&amp;page=&amp;channel=m_ad_yingren&amp;direct_dl=1" rel="nofollow">用App查看影人资料</a>
          </p>
        </div>
        <div class="msg-img-wrap">
          <img :src="movieMsg.images.medium" :alt="movieMsg.alt">
        </div>
      </section>
      <section class="msg-count">
        <div>{{movieMsg.wish_count}}人想看</div>
        <div>{{movieMsg.reviews_count}}人看过</div>
      </section>
      <div class="msg-summary">
        <p>{{movieMsg.title}}的剧情介绍</p>
        {{movieMsg.summary}}
      </div>
      <section class="msg-duanping">
        <h3>{{movieMsg.title}}的短评</h3>
        <div v-for="item in movieMsg.popular_comments">
          <div class="author-intro">
            <img :src="item.author.avatar" :alt="item.author.alt">
          <div class="author-name">
            <span class="comment-author-name">{{item.author.name}}</span>
            <star :score="item.rating.value*2"></star>
          </div>
            <span class="created-at">{{item.created_at}}</span>
        </div>
          <p class="author-content">{{item.content}}</p>
        </div>
        <p @click="shortCommentary(movieMsg.id)" class="msg-all-Comment">查看全部短论</p>
        <p @click="cinecism(movieMsg.id)" class="msg-all-Comment">查看全部影评</p>
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
        movieMsg: {
          'rating': {
            'max': '',
            'average': '',
            'details': {
              '1': '',
              '3': '',
              '2': '',
              '5': '',
              '4': ''
            },
            'stars': '',
            'min': 0
          },
          trailer_urls: [],
          collect_count: '',
          'wish_count': '',
          'reviews_count': '',
          'images': {
            'small': '',
            'large': '',
            'medium': ''
          },
          'alt': '',
          'year': '',
          'pubdates': [],
          'id': '',
          'pubdate': '',
          'title': '',
          'languages': [],
          'countries': [],
          'writers': [{
              'avatars': {
                'small': '',
                'large': '',
                'medium': ''
              },
              'name_en': '',
              'name': '',
              'alt': '',
              'id': ''
            },
            {
              'avatars': {
                'small': '',
                'large': '',
                'medium': ''
              },
              'name_en': '',
              'name': '',
              'alt': '',
              'id': ''
            }
          ],
          'casts': [
            {
              'avatars': {
                'small': '',
                'large': '',
                'medium': ''
              },
              'name_en': '',
              'name': '',
              'alt': '',
              'id': ''
            }
          ],
          'summary': '',
          'directors': [
            {
              'avatars': {
                'small': '',
                'large': '',
                'medium': ''
              },
              'name_en': '',
              'name': '',
              'alt': '',
              'id': ''
            }
          ],
          'durations': [],
          'genres': [],
          popular_comments: [{
            rating: {
              max: '',
              min: '',
              value: ''
            },
            author: {
              uid: '',
              avatar: '',
              name: ''
            },
            content: '',
            create_at: ''
          }],
          comments_count: '',
          popular_reviews: ''
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
      this.$nextTick(function () {
        const _this = this
        const id = 'https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&client=something&udid=dddddddddddddddddddddd'
        this.$http.jsonp(id)
        .then(function (response) {
          _this.movieMsg = response.body
          this.loading = false
          // console.log(JSON.stringify(response))
        })
        .catch(function (response) {
          console.log(response)
        })
      })
    },
    methods: {
      starMsg: function (str) {
        const path = '/starMsg/' + str
        this.$router.push({path: path})
      },
      cinecism: function (str) {
        const path = '/cinecism/' + str
        this.$router.push({path: path})
      },
      shortCommentary: function (str) {
        const path = '/shortCommentary/' + str
        this.$router.push({path: path})
      }
    }
  }
</script>

<style scoped>
  .msg-movie {
    display: flex;
    padding: 15px;
    color: #6b6868;
  }
  .msg-movie p {
    color: #494949;
    float: left;
    font-size: 14px;
    line-height: 1.6;
  }
  .msg-movie-intro {
    width: 100%;
    margin-top: 5px;
  }
  .open-douban-app {
    margin-top: 10px;
    clear: both;
  }
  .open-douban-app a {
    text-decoration: none;
  }
  .msg-movie-intro .open-douban-app a{
    color: #42bd56;
  }
  .msg-img-wrap {
    width: 100px;
    height: 160px;
  }
  .msg-img-wrap img {
    border: 1px solid white;
  }
  .msg-movie:last-child {
    padding-left: 10px;
  }
  .msg-movie-title {
    font-size: 24px;
    color: #000;
  }
  .msg-movie-rating {
    display: flex;
    font-size: 14px;
  }
  .msg-movie-rating span {
    padding-left: 5px;
  }
  .msg-count {
    display: flex;
    justify-content: center;
    padding: 10px;
  }
  .msg-count div {
    margin: 0 auto;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    width: 137px;
    height: 32px;
    color: #ffb712;
    border-radius: 3px;
    border: 1px solid #ffb712;
  }
  .msg-summary {
    padding: 10px;
    font-size: 15px;
    color: #494949;
    line-height: 22px;
    word-wrap: break-word;
  }
  .msg-summary p {
    color: #aaa;
    font-size: 15px;
    margin: 0 0 15px;
  }
  .msg-duanping {
    padding: 10px;
    font-size: 15px;
    box-sizing: border-box;
  }
  .msg-duanping h3 {
    color: #aaa;
    font-size: 15px;
    margin-bottom: 5px;
  }
  .author-content {
    color: #333;
    padding-left: 40px;
    padding-right: 15px;
    margin-bottom: 25px;
  }
  .author-intro {
    position: relative;
    margin-top: 10px;
    color: #999;
    height: 55px;
  }
  .author-name {
    position: relative;
    top: -35px;
    left: 50px;
    width: 300px;
    color: #ccc;
    font-size: 12px;
    display: flex;
  }
  .comment-author-name {
    font-size: 15px;
    display: inline-block;
    vertical-align: text-top;
    margin-top: -3px;
    margin-right: 6px;
    color: #494949;
    font-weight: bold;
  }
  .created-at {
    font-size: 12px;
    display: inline-block;
    position: relative;
    top: -30px;
    left: 50px;
  }
/*   .author-intro .author-name {
  display: flex;
} */
  .author-intro .author-name span {
    margin-right: 5px;
  }
  .author-intro:last-child {
    margin-bottom: 0;
  }
  .author-intro img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .author-intro span {
    vertical-align: 80%;
    color: #999;
  }
  .msg-all-Comment {
    color: #00b600;
    font-weight: lighter;
    text-align: center;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
  }
</style>
