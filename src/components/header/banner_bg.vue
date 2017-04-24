<template>
  <div class="banner_bg">
    <img src="../../assets/img/promotion.jpg" alt="app">
    <div class="banner_wrapper">
      <div class="promo_title">
        <span>用App打开</span>
        <span>关注影评人</span>
      </div>
      <div class="button_wrapper">
        <button class="promo_button download_app">
          <a href="https://www.douban.com/doubanapp/app?model=B&amp;copy=1&amp;page=movie&amp;channel=card_movie&amp;direct_dl=1" rel="nofollow" >极速下载</a>
        </button>
        <button class="promo_button open_app">
          <a href="https://www.douban.com/doubanapp/dispatch?from=mdouban&amp;download=1&amp;model=B&amp;copy=1&amp;page=movie&amp;channel=card_movie&amp;uri=%2Fmovie%2F26260853" rel="nofollow">打开</a>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped>
  .banner_bg img {
    width: 100%;
  }
  .banner_wrapper {
    position: absolute;
    left: 18px;
    top: 50px;
    height: 80px;
    width: 90%;
  }
  .promo_title {
    margin-top: 15px;
    width: 75px;
    height: 48px;
  }
  .promo_title span {
    font-size: 14px;
    font-weight: normal;
    line-height: 22px;
    color: #42bd56;
  }
  .button_wrapper {
    width: 167px;
    height: 28px;
    position: absolute;
    top: 24px;
    right: 0;
  }
  .button_wrapper button {
    border: 1px solid #42bd56;
    border-radius: 3px;
  }
  .promo_button a {
    font-size: 13px;
    font-weight: bold;
    width: auto;
    padding: 0 14px;
    position: relative;
  }
  .download_app {
    height: 26px;
    width: 94px;
    background-color: #42bd56;
    border: 1px solid #42bd56;
  }
  .download_app a {
    color: #fff;
  }
  .open_app {
    height: 26px;
    width: 68px;
    border: 1px solid #42bd56;
    background-color: #ecf9ef;
  }
  .open_app a {
    color: #42bd56;
  }
</style>
