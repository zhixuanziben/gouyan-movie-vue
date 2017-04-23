<template>
<div class="loading">
  <img src="../../assets/img/loading.gif">
  <span>加载中</span>
</div>
</template>

<script>
import vHeader from '../header/header'
export default {
  components: {
    'v-header': vHeader
    }
  }
</script>

<style>
.loading {
  width: 100px;
  margin: 20px auto;
}
.loading img {
  width: 20px;
  height: 20px;
}
.loading span {
  font-size: 18px;
  line-height: 40px;
  padding-left: 5px;
}
</style>
