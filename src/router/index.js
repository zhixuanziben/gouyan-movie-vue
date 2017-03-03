import Vue from 'vue'
import Router from 'vue-router'
import inTheaters from '@/components/inTheaters'
import comingSoon from '@/components/comingSoon'
import top250 from '@/components/top250'
import moviesMsg from '@/components/moviesMsg'
import serchResult from '@/components/serchResult'

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
      path: '/top250',
      name: 'top250',
      component: top250
    },
    {
      path: '/serchResult',
      name: 'serchResult',
      component: serchResult
    }
  ]
})
