import Vue from 'vue'
import Router from 'vue-router'
import inTheaters from '../views/inTheaters'
import comingSoon from '../views/comingSoon'
import moviesMsg from '../views/moviesMsg'
import serchResult from '../views/serchResult'
import cinecism from '../views/cinecism'
import shortCommentary from '../views/shortCommentary'
import searchPage from '../views/searchPage'
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
      path: '/cinecism/:id',
      name: 'cinecism',
      component: cinecism
    },
    {
      path: '/shortCommentary/:id',
      name: 'shortCommentary',
      component: shortCommentary
    },
    {
      path: '/searchPage',
      name: 'searchPage',
      component: searchPage
    }
  ]
})
