<template>
  <div class="in-theaters">
    <v-header ></v-header>
    <div v-if='!guodu' class="in-theaters-area">
      <div class="in-movies-wrap" >
        <div class="in-movies-show" v-for="(item, index) in in_theaters_data_body_subjects" @click="showMoreMsg(item.id)">
          <div class="in-movies-show-child">
            <div class="posters"><img :src="item.images.small" :alt="item.alt"></div>
            <div class="movieMsg">
              <h2>{{ item.title }}</h2>
              <star :score="item.rating.average"></star>
              <p>{{ item.rating.average }}分</p>
              <p>导演:{{ item.directors[0].name}}</p>
              <p>
                主演:{{ item.casts[0].name}}
                <span v-if="item.casts[1]">, {{ item.casts[1].name }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>      
    </div>
    <spinner v-if='guodu'></spinner>
  </div>
</template>

<script>
import spinner from './spinner/spinner'
import vHeader from './header/header'
import star from './star/star'
export default {
  name: 'hello',
  data () {
    return {
      guodu: true,
      in_theaters_data: {},
      in_theaters_data_body: {},
      in_theaters_data_body_subjects: []
    }
  },
  components: {
    spinner: spinner,
    'v-header': vHeader,
    star: star
  },
  mounted: function () {
    this.$http.jsonp('https://api.douban.com/v2/movie/in_theaters')
        .then(function (response) {
          this.guodu = false
          this.in_theaters_data = response
          this.in_theaters_data_body = response.body
          this.in_theaters_data_body_subjects = response.body.subjects
        })
        .catch(function (response) {
          console.log(response)
        })
  },
  methods: {
    showMoreMsg: function (str) {
      const path = '/movie/' + str
      this.$router.push({path: path})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    margin: 0;
    padding: 0;
  }
  h1 {
    text-align: center;
  }
  .in-movies-wrap {
    text-decoration: none;
    font-size: 0;
  }
  .in-movies-show {
    background-color: #f8f8f8;
    padding: 10px 20px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 0;
  }
  .in-movies-show-child {
    display: flex;
    align-items: flex-end;
    padding-bottom: 10px;
    border-bottom: 1px solid #d6d6d6;
  }
  .in-movies-show p {
    font-size: 14px;
    color: #666;
  }
  .movieMsg {
    flex: 1;
    padding-left: 20px;
    vertical-align: top;
  }
  .movieMsg h2 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
  }
</style>
