<template>
    <div>
        <img src="../assets/图层 9.png" alt="" class="background">
        <img src="../assets/title2.png" alt="" class="title">
        <img src="../assets/40D10A099E889867B86F4348127FA8D8.png" alt="" class="back" @click="back">
        <div class="topline">
            <div :class="active==1?'focus':'unfouse'" @click="light(1)">全部</div>
            <div :class="active==2?'focus':'unfouse'" @click="light(2)">森林</div>
            <div :class="active==3?'focus':'unfouse'" @click="light(3)">庄园</div>
        </div>
        <div class="imglist" >
            <div class="listimg" v-for="item in imglist" :key="item.id">
                <img :src="item.src" alt="">
            </div>
        </div>
    </div>
</template>
<style scoped>

.background{
    position: absolute;
    left: 0;
    top: 0;
    width: 720px;
    height: 1280px;
}
.title{
    position: absolute;
    left: 304px;
    top: 71px;
    width: 111px;
    height: 55px;
}
.topline{
    position: absolute;
    top: 173px;
    left: 50px;
    width: 620px;
    height: 40px;
}
.topline div{
    width: 80px;
    height: 40px;
    float: left;
    margin-right: 20px;
    line-height: 40px;
    font-size: 24px;
    background-color: white;
    border-radius:20px;
    color: #AFABA9;
    cursor: pointer;
}
.topline .focus{
    color: white;
    background-color: rgb(189,188,181);
}
.imglist{
    position: absolute;
    left: 40px;
    top: 239px;
    width: 640px;
    height: 940px;
}
.listimg{
    position: relative;
    float: left;
    margin:0 6px 14px 6px;
    width: 308px;
    height: 212px;
}
.listimg img{
    width: 308px;
    height: 212px;
}
.back{
    left: 50px;
    top: 66px;
    position: absolute;
    cursor: pointer;
    width: 61px;
    height: 64px;
}
</style>
<script>
export default {
    data () {
        return {
            active:1,
            imglist:[{
                id:1,
                src:"./background/1.png"
            },{
                id:2,
                src:"./background/2.png"
            },{
                id:3,
                src:"./background/3.png"
            },{
                id:4,
                src:"./background/4.png"
            },{
                id:5,
                src:"./background/5.png"
            }]    
        }
    },
    methods: {
        back(){
            this.$router.push({ path: '/index' })
        },
        light(x){
            if(x!=this.active){
                this.active=x;
            }
        }
    },
}
</script>