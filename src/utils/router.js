import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../pages/index.vue'
import photo from '../pages/photo.vue'
import person from '../pages/person.vue'
import achievement from '../pages/achievement.vue'
import game1 from '../pages/game1.vue'
import game2 from '../pages/game2.vue'

Vue.use(VueRouter)
const router = new VueRouter({
    
    routes: [
        { path:'/',  redirect: '/index' },
        { path:'/index', component:index,meta:{index:0}},
        { path:'/photo', component:photo,meta:{index:1}},
        { path:'/person', component:person,meta:{index:0}},
        { path:'/achievement', component:achievement,meta:{index:1}},
        { path:'/game1', component:game1,meta:{index:0}},
        { path:'/game2', component:game2,meta:{index:0}}
    ]
})
export default router;