<template>
  <div>
    <div class="search-wrap">
      <span @click="notSubmit()">关闭</span>
      <input id="inp" v-model="query" @keyup.enter="submit()">
    </div>
    <ul>
      <li>
        <div>
          <a href="/movie" target="_blank">
            <strong style="color: rgb(35, 132, 232);">电影</strong>
            <span>影院热映</span>
          </a>
          <a href="https://douban.com/location" target="">
            <strong style="color: rgb(230, 70, 126);">同城</strong>
            <span>周末活动</span>
          </a>
          <a href="https://read.douban.com" target="">
            <strong style="color: rgb(159, 120, 96);">阅读</strong>
            <span>电子书</span>
          </a>
          <a href="https://dongxi.douban.com/?dcs=mobile-anonymous-home&amp;dcm=douban" target="">
            <strong style="color: rgb(225, 100, 77);">东西</strong>
            <span>心爱之物</span>
          </a>
        </div>
      </li>
      <li>
        <div>
          <a href="/tv" target="_blank">
            <strong style="color: rgb(122, 106, 219);">电视</strong>
            <span>正在热播</span>
          </a>
          <a href="/group" target="_blank">
            <strong style="color: rgb(42, 184, 204);">小组</strong>
            <span>志趣相投</span>
          </a>
          <a href="/game" target="_blank">
            <strong style="color: rgb(87, 116, 197);">游戏</strong>
            <span>虚拟世界</span>
          </a>
          <a href="https://douban.fm" target="">
            <strong style="color: rgb(64, 207, 169);">FM</strong>
            <span>红心歌单</span>
          </a>
        </div>
      </li>
      <li>
        <div>
          <a href="/book" target="_blank">
            <strong style="color: rgb(159, 120, 96);">图书</strong>
            <span>畅销排行</span>
          </a>
          <a href="/music" target="_blank">
            <strong style="color: rgb(244, 143, 46);">音乐</strong>
            <span>新碟榜</span>
          </a>
          <a href="/mobileapp" target="_blank">
            <strong style="color: rgb(89, 108, 221);">应用</strong>
            <span>玩手机</span>
          </a>
          <a href="https://market.douban.com/?utm_campaign=mobile_web_douban_nav&amp;utm_source=douban&amp;utm_medium=mobile_web" target="">
            <strong style="color: rgb(66, 189, 86);">市集</strong>
            <span>购买原创</span>
          </a>
        </div>
      </li>
    </ul>
    <div class="nav-buttom">
      <a class="toPC" href="/to_pc/?url=https%3A%2F%2Fm.douban.com%2Fmovie%2F">使用桌面版</a>
      <a class="toApp" href="https://m.douban.com/">使用豆瓣App</a>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        query: ''
      }
    },
    methods: {
      submit: function () {
        this.$router.push({path: '/serchResult', query: { name: this.query }})
        this.query = ''
      },
      notSubmit: function () {
        window.history.go(-1)
      }
    }
  }
</script>

<style scoped>
  .search-wrap {
    display: flex;
    height: 61px;
    border-bottom: 1px solid #f3f3f3;
  }

  .search-wrap input {
    width: 70%;
    height: 32px;
    margin: auto;
    text-decoration: none;
    border: 1px solid #f3f3f3;
    background-image: url(/static/img/search_1.png);
    background-repeat: no-repeat;
    background-position:center;
    background-color: #f3f3f3;
    padding-left: 2em;
  }

  .search-wrap input:focus {
    background-image: none;
  }

  .search-wrap button img {
    padding-right: 15px;
  }

  .search-wrap span {
    margin-left: 15px;
    font-size: 16px;
    color: #42bd56;
    align-self: center;
    cursor: pointer;
  }

  ul {
    padding-top: 25px;
    overflow: hidden;
    display: -webkit-box;
    display: flex;
    justify-content: space-around;
  }

  li {
    width: 33.33%;
  }

  li div {
    float: left;
    position: relative;
    left: 50%;
    top: 0;
  }

  li a {
    display: block;
    text-align: center;
    margin-bottom: 25px;
    position: relative;
    left: -50%;
    top: 0;
  }

  li strong {
    display: block;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
  }

  li span {
    display: block;
    color: #999;
    height: 17px;
    font-size: 12px;
    letter-spacing: 1px;
  }

 .nav-buttom {
    width: 100%;
    border-bottom: 1px solid #f3f3f3;
    border-top: 1px solid #f3f3f3;
    padding: 13px 0;
  }

 .nav-buttom a {
    width: 48%;
    display: inline-block;
    box-sizing: border-box;
    margin: 0 auto;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    color: #42bd56;
  }

 .nav-buttom  a:first-child {
    border-right: 1px solid #e5e5e5;
  }
</style>
