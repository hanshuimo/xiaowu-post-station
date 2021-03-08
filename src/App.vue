<template>
  <div id="app">
      <transition :name="transitionName">   
        <router-view id="main"></router-view>
      </transition>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      transitionName:''  
    }
  },
  watch: {
    $route(to, from) {
      if(to.meta.index > from.meta.index){
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  },

}
</script>

<style>
body{
  min-width: 720px;
  min-height: 1280px;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 720px;
  height: 1280px;
  overflow: hidden;
}
#main{
  overflow: hidden;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
