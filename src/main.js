import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './utils/router.js'
import animated from 'animate.css'
import VueMap from 'vue-amap';
Vue.use(VueMap);
Vue.use(animated)

Vue.use(VueRouter)
Vue.config.productionTip = false
VueMap.initAMapApiLoader({
  // 高德的key
  key: '3609c7ffdfffc3c87d3af29387606d87',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});

new Vue({
  data() {
    return {
      userid:"",
      Number:"123456",
      Password:"123456",
      baseurl:'http://39.108.177.113:8080/zhejiang',
      currentModule:2,
      level:1,
      cleanning:50,
      mm:0,
      m:0,
      ss:0,
      s:0,
      positionid:1,
    }
  },
  router:Routes,
  render: h => h(App),
}).$mount('#app')
