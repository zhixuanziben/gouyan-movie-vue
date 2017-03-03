<template>
  <div>
    <spinner v-if='guodu'></spinner>
    <div  v-if='!guodu'>
      <div class="header">
        <div>
          <img :src="movieMsg.images.medium">
        </div>
        <div>
          <p>{{movieMsg.title}}</p>
          <p>{{movieMsg.rating.average}}({{movieMsg.collect_count}}人评分)</p>
          <p>{{movieMsg.year}}</p> 
          <p><span v-for='item of movieMsg.genres'>{{item}}/</span></p>
          <p v-if="movieMsg.country">{{movieMsg.country[0]}}</p>
        </div>
      </div>
      <div>
        <div>{{movieMsg.wish_count}}人想看</div>
        <div>{{movieMsg.reviews_count}}人看过</div>
      </div>
      <div class="intru">
        {{movieMsg.summary}}
      </div>
      <div v-for="item of movieMsg.directors">
        <div v-if="item.avatars.small">
          <img :src="item.avatars.small">
        </div>
        <div>
          {{item.name}}[导演]
        </div>
      </div>
      <div  v-if = "!!(movieMsg && movieMsg.casts && movieMsg.casts.length)" v-for="item of movieMsg.casts">
        <div>
          <img :src="item.avatars.small" :alt="item.alt"></div>
        </div>
        <div v-if="item">
          {{item.name}}
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
        movieMsg: {
          images: '',
          wish_count: '',
          reviews_count: '',
          title: '',
          summary: '',
          rating: '',
          year: '',
          country: [],
          genres: [],
          casts: [{
            avatars: {
              small: '',
              medium: '',
              large: ''
            },
            name: 'ds',
            alt: ''
          }],
          directors: [{
            avatars: {
              small: '',
              medium: '',
              large: ''
            },
            name: '',
            alt: ''
          }]
        }
      }
    },
    components: {
      spinner: spinner
    },
    mounted: function () {
      this.$nextTick(function () {
        const _this = this
        const id = 'http://api.douban.com/v2/movie/subject/' + this.$route.params.id
        this.$http.jsonp(id)
        .then(function (response) {
          this.guodu = false
          _this.movieMsg = response.body
        })
        .catch(function (response) {
          console.log(response)
        })
      })
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
