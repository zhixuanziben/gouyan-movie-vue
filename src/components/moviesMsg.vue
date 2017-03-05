<template>
  <div>
    <spinner v-if='guodu'></spinner>
    <div  v-if='!guodu'>
      <div class="header">
        <div>
          <img :src="movieMsg.images.medium" :alt="movieMsg.alt">
        </div>
        <div>
          <p>{{movieMsg.title}}</p>
          <p>{{movieMsg.rating.average}}({{movieMsg.collect_count}}人评分)</p>
          <p>{{movieMsg.year}}</p> 
          <p><span v-for='item of movieMsg.genres'>{{item}}/</span></p>
          <p v-for="item in movieMsg.countries">{{item}}</p>
          <p v-for="item in movieMsg.durations" v-if="item.indexOf('中国')>0">{{item}}</p>
          <p v-for="item in movieMsg.pubdates" v-if="item.indexOf('中国')>0">{{item}}</p>
        </div>
      </div>
      <div>
        <div>{{movieMsg.wish_count}}人想看</div>
        <div>{{movieMsg.reviews_count}}人看过</div>
      </div>
      <div class="intru">
        {{movieMsg.summary}}
      </div>
      <div v-for="item of movieMsg.directors" @click="starMsg(item.id)">
        <div v-if="item.avatars.small">
          <img :src="item.avatars.small" :alt="item.alt">
        </div>
        <div>
          {{item.name}}[导演]
        </div>
      </div>
      <div v-for="item of movieMsg.casts" @click="starMsg(item.id)">
        <div v-if="item.avatars.small">
          <img :src="item.avatars.small" :alt="item.alt">
        </div>
        <div>
          {{item.name}}
        </div>
      </div>
      <p @click="workerList(movieMsg.id)">媒体库></p>
      <div class="duanping">
        <h2>短评</h2>
        <div v-for="item in movieMsg.popular_comments">
          <p>{{item.rating.value}}分</p>
          <p>{{item.created_at}}</p>
          <p>{{item.content}}</p>
          <div>
            <img :src="item.author.avatar" :alt="item.author.alt">
            <span>{{item.author.name}}</span>
          </div>
        </div>
        <p @click="smallComment(movieMsg.id)">查看全部短论</p>
        <p @click="comment(movieMsg.id)">查看全部影评</p>
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
      spinner: spinner
    },
    mounted: function () {
      this.$nextTick(function () {
        const _this = this
        const id = 'http://api.douban.com/v2/movie/subject/' + this.$route.params.id + '?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&client=something&udid=dddddddddddddddddddddd'
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
      workerList: function (str) {
        const path = '/workerList/' + str
        this.$router.push({path: path})
      },
      comment: function (str) {
        const path = '/comment/' + str
        this.$router.push({path: path})
      },
      smallComment: function (str) {
        const path = '/smallComment/' + str
        this.$router.push({path: path})
      }
    }
  }
</script>

<style scoped>
  .nav {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    background-color: gray;
  }
  .nav span {
    flex: 1;
    text-align: center;
    text-decoration: none;
    color: pink;
  }
</style>
