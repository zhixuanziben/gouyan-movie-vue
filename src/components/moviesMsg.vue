<template>
  <div>
    <spinner v-if='guodu'></spinner>
    <div v-if='!guodu'>
      <div class="header-title">
        <div class="msg-back" @click="backLastPage">
          <div></div>
        </div>
        <div class="msg-title">{{movieMsg.title}}</div>
        <div class="msg-back"></div>
      </div>
      <section class="msg-movie">
        <div class="msg-img-wrap">
          <img :src="movieMsg.images.medium" :alt="movieMsg.alt">
        </div>
        <div class="">
          <h3 class="msg-movie-title">{{movieMsg.title}}</h3>
          <star :score="movieMsg.rating.average"></star>
          <p class="msg-movie-count">{{movieMsg.rating.average}}({{movieMsg.collect_count}}人评分)</p>
          <p>{{movieMsg.year}}年</p> 
          <p>{{movieMsg.genres.join(', ')}}</span></p>
          <p v-for="item in movieMsg.countries">{{item}}</p>
          <p v-for="item in movieMsg.durations" v-if="item.indexOf('中国')>0">{{item}}</p>
          <p v-for="item in movieMsg.pubdates" v-if="item.indexOf('中国')>0">{{item}}</p>
        </div>
      </section>
      <section class="msg-count">
        <div>{{movieMsg.wish_count}}人想看</div>
        <div>{{movieMsg.reviews_count}}人看过</div>
      </section>
      <div class="msg-summary">
        {{movieMsg.summary}}
      </div>
      <section class="msg-scoll-hidden">
        <section class="msg-star-wrap">
          <h3>演职人员</h3>
          <div class="msg-scoll">
            <div class="msg-star" v-for="item of movieMsg.directors" @click="starMsg(item.id)">
              <div v-if="item.avatars.small">
                <img :src="item.avatars.small" :alt="item.alt">
              </div>
              <div class="msg-star-name">
                {{item.name}}[导演]
              </div>
            </div><div v-for="item of movieMsg.casts" @click="starMsg(item.id)">
              <div v-if="item.avatars.small">
                <img :src="item.avatars.small" :alt="item.alt">
              </div>
              <div class="msg-star-name">
                {{item.name}}
              </div>
            </div>
          </div>
        </section>
      </section>
      <section class="msg-duanping">
        <h3>热门短评</h3>
        <div v-for="item in movieMsg.popular_comments">
          <div class="msg-rating">
            <star :score="item.rating.value*2"></star>
            <span>{{item.created_at}}</span>
          </div>
          <p class="author-content">{{item.content}}</p>
          <div class="author-img">
            <img :src="item.author.avatar" :alt="item.author.alt">
            <span>{{item.author.name}}</span>
          </div>
        </div>
        <p @click="smallComment(movieMsg.id)" class="msg-all-Comment">查看全部短论</p>
        <p @click="comment(movieMsg.id)" class="msg-all-Comment">查看全部影评</p>
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
      spinner, star
    },
    mounted: function () {
      this.$nextTick(function () {
        const _this = this
        const id = 'https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&client=something&udid=dddddddddddddddddddddd'
        this.$http.jsonp(id)
        .then(function (response) {
          _this.movieMsg = response.body
          this.guodu = false
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
      comment: function (str) {
        const path = '/comment/' + str
        this.$router.push({path: path})
      },
      smallComment: function (str) {
        const path = '/smallComment/' + str
        this.$router.push({path: path})
      },
      backLastPage: function () {
        window.history.go(-1)
      }
    }
  }
</script>

<style scoped>
  .header-title {
    display: flex;
    height: 50px;
    width: 100%;
    background-color: #e54847;
    padding: 6px;
    box-sizing: border-box;
  }
  .msg-back {
    width: 50px;
    position: relative;
    cursor: pointer;
  }
  .msg-back > div {
    position: absolute;
    top: 12px;
    left: 12px;
    height: 13px;
    width: 13px;
    border: 2px solid #fff;
    border-width: 0 0 2px 2px;
    transform: rotate(45deg);
  }
  .msg-title {
    flex: 1;
    color: #fff;
    text-align: center;
    line-height: 2;
    font-size: 20px;
    overflow: hidden;
  }
  .msg-img-wrap {
    margin-right: 10px;
  }
  .msg-img-wrap img {
    border: 1px solid white;
  }
  .msg-movie {
    display: flex;
    padding: 15px;
    color: #6b6868;
    background-color: #b4b1b1;
  }
  .msg-movie:last-child {
    padding-left: 10px;
  }
  .msg-movie-title {
    font-size: 20px;
    color: #343232;
  }
  .msg-count {
    display: flex;
    justify-content: center;
    padding: 10px;
  }
  .msg-count div {
    margin-right: 20px;
    margin-left: 20px;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    width: 100px;
    height: 30px;
    color: white;
    border-radius: 5px;
    background-color: #e54847;
  }
  .msg-summary {
    padding: 10px;
    font-size: 14px;
    color: #555;
  }
  .msg-star-wrap {
    padding: 10px;
  }
  .msg-scoll {
    white-space: nowrap;
    overflow-x: scroll;
    margin-top: 10px;
  }
  .msg-scoll-hidden {
    overflow: hidden;
    height: 165px;
    margin: 0 auto;
    overflow: hidden;
  }
  .msg-scoll > div {
    display: inline-block;
    margin-right: 5px;
  }
  .msg-star-name {
    width: 70px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .msg-duanping {
    padding: 10px;
    box-sizing: border-box;
  }
  .msg-star-wrap h3,
  .msg-duanping h3 {
    color: #666;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 5px;
  }
  .author-content {
    color: #333;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .author-img {
    margin-bottom: 10px;
    border-bottom: 1px solid #d6d3d3;
  }
  .author-img:last-child {
    margin-bottom: 0;
  }
  .author-img img {
    border-radius: 50%;
  }
  .author-img span {
    vertical-align: 80%;
    margin-left: 5px;
    color: #999;
  }
  .msg-all-Comment {
    color: #e54847;
    font-weight: lighter;
    text-align: center;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #d6d3d3;
  }
  .msg-rating {
    display: flex;
  }
  .msg-rating:last-child {
    flex: 1;
  }
</style>
