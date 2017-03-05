<template>
  <div>
    <spinner v-if='guodu'></spinner>
    <h1>剧照,共{{photosMsg.count}}张</h1>
    <div>
      <img v-for="item in photosMsg.photos" :src="item.image" :alt="item.alt">
    </div>
  </div>
</template>

<script>
import spinner from './spinner'
  export default {
    data () {
      return {
        guodu: true,
        photosMsg: {
          photos: [{
            image: '',
            alt: ''
          }],
          count: ''
        }
      }
    },
    components: {spinner},
    mounted: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '/photos?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=3&client=something&udid=dddddddddddddddddddddd')
        .then(function (response) {
          this.guodu = false
          this.photosMsg = response.body
          response.body.photos[2].length = 10
          console.log(response.body.photos[2].image)
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
