import Vue from 'vue'
import Router from 'vue-router'
import inTheaters from '../components/inTheaters'
import comingSoon from '../components/comingSoon'
import moviesMsg from '../components/moviesMsg'
import serchResult from '../components/serchResult'
import starMsg from '../components/starMsg'
import comment from '../components/comment'
import smallComment from '../components/smallComment'
import searchPage from '../components/searchPage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/inTheaters',
      name: 'inTheaters',
      component: inTheaters
    },
    {
      path: '/movie/:id',
      name: 'moviesMsg',
      component: moviesMsg
    },
    {
      path: '/comingSoon',
      name: 'comingSoon',
      component: comingSoon
    },
    {
      path: '/serchResult',
      name: 'serchResult',
      component: serchResult
    },
    {
      path: '/starMsg/:id',
      name: 'starMsg',
      component: starMsg
    },
    {
      path: '/comment/:id',
      name: 'comment',
      component: comment
    },
    {
      path: '/smallComment/:id',
      name: 'smallComment',
      component: smallComment
    },
    {
      path: '/searchPage',
      name: 'searchPage',
      component: searchPage
    }
  ]
})
