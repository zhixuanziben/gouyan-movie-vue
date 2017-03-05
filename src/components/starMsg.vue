<template>
  <div>
    <spinner v-if='guodu'></spinner>
    <div>
      <div @click="backLastPage"><</div>
    </div>
    <h1>{{starMsg.name_en}}{{starMsg.name}}</h1>
    <div>
      <img :src="starMsg.avatars.large">
      <div>
        <p>{{starMsg.name}}</p>
        <p>{{starMsg.name_en}}</p>
        <p>{{starMsg.gender}}</p>
      </div>
    </div>
    <div>
      <h2 v-if="starMsg.gender == '男'">他的代表作品</h2>
      <h2 v-if="starMsg.gender == '女'">她的代表作品</h2>
      <div @click="movieMsg(item.subject.id)" v-for="item in starMsg.works">
        <div>
          <img :src="item.subject.images.small">
        </div>
        <div>
          <div>
            <p>{{item.subject.title}}</p>
            <p v-for="it in item.roles">{{it}}</p>
            <p>{{item.subject.year}}</p>
          </div>
          <div>
            {{item.subject.rating.average}}分
            {{item.subject.collect_count}}人评价
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
        starMsg: {
          name: '',
          name_en: '',
          works: [
            {
              roles: [],
              subject: {
                rating: {
                  max: '',
                  average: ''
                },
                collect_count: '',
                original_title: '',
                title: '',
                images: {
                  small: '',
                  large: '',
                  medium: ''
                },
                alt: '',
                year: '',
                id: ''
              }
            }
          ],
          avatars: {
            small: '',
            large: '',
            medium: ''
          },
          alt: '',
          gender: '',
          id: '',
          born_place: ''
        }
      }
    },
    components: {spinner},
    mounted: function () {
      this.$http.jsonp('http://api.douban.com/v2/movie/celebrity/' + this.$route.params.id)
          .then(function (response) {
            this.guodu = false
            this.starMsg = response.body
            // console.log(JSON.stringify(response))
          })
          .catch(function (response) {
            console.log(response)
          })
    },
    methods: {
      movieMsg: function (str) {
        const path = '/movie/' + str
        this.$router.push({path: path})
      },
      backLastPage: function () {
        window.history.go(-1)
      }
    }
  }
</script>

<style>
  
</style>
