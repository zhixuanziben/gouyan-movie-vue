<template>
  <div>
    <spinner v-if='guodu'></spinner>
    <div v-if='!guodu'>
      <header class="star-header-title">
        <div class="star-back" @click="backLastPage">
          <div></div>
        </div>
        <div class="star-title">{{starMsg.name_en}} {{starMsg.name}}</div>
        <div class="star-back"></div>
      </header>
      <section class="star-msg">
        <img :src="starMsg.avatars.large">
        <div>
          <h3>影星资料</h3>
          <p>{{starMsg.name}}</p>
          <p>{{starMsg.name_en}}</p>
          <p>{{starMsg.gender}}</p>
        </div>
      </section>
      <section class="star-movie-wrap">
        <h3 v-if="starMsg.gender == '男'">他的代表作品</h3>
        <h3 v-if="starMsg.gender == '女'">她的代表作品</h3>
        <div class="star-movie" @click="movieMsg(item.subject.id)" v-for="item in starMsg.works">
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
              <star :score="item.subject.rating.average"></star>
              {{item.subject.rating.average}}分
              {{item.subject.collect_count}}人评价
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
    components: {spinner, star},
    mounted: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/celebrity/' + this.$route.params.id)
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
  .star-header-title {
    display: flex;
    height: 50px;
    width: 100%;
    background-color: #e54847;
    padding: 6px;
    box-sizing: border-box;
  }
  .star-back {
    width: 50px;
    position: relative;
    cursor: pointer;
  }
  .star-back > div {
    position: absolute;
    top: 12px;
    left: 12px;
    height: 13px;
    width: 13px;
    border: 2px solid #fff;
    border-width: 0 0 2px 2px;
    transform: rotate(45deg);
  }
  .star-title {
    flex: 1;
    color: #fff;
    text-align: center;
    line-height: 2;
    font-size: 20px;
    overflow: hidden;
  }
  .star-msg {
    background-color: #b4b1b1;
    padding: 10px;
  }
  .star-msg img {
    width: 150px;
    height: 200px;
    margin-right: 20px;
  }
  .star-msg div {
    display: inline-block;
    font-size: 20px;
    color: #f0eeee;
    vertical-align: bottom;
  }
  .star-msg h3 {
    font-size: 25px;
    color: white;
  }
  .star-movie-wrap {
    padding: 10px;
  }
  .star-movie-wrap h3 {
    color: #333;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .star-movie {
    display: flex;
    padding: 5px;
    font-size: 14px;
    border-bottom: 1px solid #d6d3d3;
  }
  .star-movie > div:first-child {
    width: 70px;
    margin-right: 10px;
  }
  .star-movie > div:last-child {
    flex: 1
  }
</style>
