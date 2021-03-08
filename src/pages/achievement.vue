<template>
    <div>
        <img src="../assets/back.png" alt="" class="backIndex" @click="back">
        <img src="../assets/achievement.png" alt="" class="head" v-show="active==1">
        <img src="../assets/achievement2.png" alt="" class="head2" v-show="active==2">
        <div class="topline">
            <div :class="active==1?'focus':'unfocus'" @click="change(1)">我的勋章</div>
            <div :class="active==2?'focus':'unfocus'" @click="change(2)">我的里程</div>
        </div>
        <div class="mainBox" v-show="active==1">
            <img src="../assets/layer.png" alt="" class="layerBackground layerBack1">
            <img src="../assets/layer.png" alt="" class="layerBackground layerBack2">
            <img src="../assets/layer.png" alt="" class="layerBackground layerBack3">
            <img src="../assets/layer.png" alt="" class="layerBackground layerBack4">
            <img src="../assets/layer.png" alt="" class="layerBackground layerBack5">
            <img src="../assets/layer.png" alt="" class="layerBackground layerBack6">
            <img src="../assets/layer.png" alt="" class="layerBackground layerBack7">
            <img src="../assets/layer.png" alt="" class="layerBackground layerBack8">
            <img src="../assets/layer.png" alt="" class="layerBackground layerBack9">
            <div v-for="item in layer" :key="'B'+item.id">
                <img :src="item.url" alt="" v-if="item.get"  :class="'layerBackground layerBack'+item.id">
            </div>
        </div>
        <img src="../assets/曲线图.png" alt="" v-show="active==2" class="lichen"> 
    </div>
</template>
<script>

export default {
    data() {
        return {
            active:1,
            layer:[{
                id:1,
                left:0,
                top:0,
                get:true,
                url:"./layer/Layer006.png"
            },{
                id:2,
                left:133/23,
                top:0,
                get:false
            },{
                id:3,
                left:266/23,
                top:0,
                get:false
            },{
                id:4,
                left:399/23,
                top:0,
                get:false
            },{
                id:5,
                left:67/23,
                top:115/23,
                get:true,
                url:"./layer/Layer012.png"
            },{
                id:6,
                left:200/23,
                top:115/23,
                get:true,
                url:"./layer/Layer015.png"
            },{
                id:7,
                left:333/23,
                top:115/23,
                get:false
            },{
                id:8,
                left:0,
                top:231/23,
                get:false
            },{
                id:9,
                left:264/23,
                top:231/23,
                get:false
            }]
        }
    },
    methods:{
        back(){
            this.$router.push({ path: '/person' })
        },
        change(id){
            this.active=id;
        }
    }
}
</script>
<style  scoped>
.backIndex{
    position: absolute;
    left: 49px;
    top: 29px;
    width: 23px;
    height: 42px;
    cursor: pointer;
}
.head{
    position: absolute;
    top: 217px;
    left: 16px;
    width: 688px;
    height: 763px;
}
.head2{
    position: absolute;
    top: 217px;
    left: 16px;
    width: 688px;
    height: 823px;
}
.topline{
    position: absolute;
    width: 412px;
    top: 415px;
    left: 154.5px;
    height: 61px;
}
.topline div{
    float: left;
    margin:0 17.5px;
    line-height: 61px;
    width:170px;
    height:61px;
    text-align: center;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(0,0,0,1);
    opacity:0.5;
    cursor: pointer;
}
.topline .focus{
    color:rgba(241,162,129,1);
    background:rgba(241,162,129,0.1);
    border-radius:31px;
}
.mainBox{
    position: absolute;
    top: 515px;
    left: 96px;
    width: 528px;
    height: 377px;
}
.layerBackground{
    position: absolute;
    width: 126px;
    height: 146px;
}
.layerBack1{
    left:0;
    top:0;
}
.layerBack2{
    left:133px;
    top:0;
}
.layerBack3{
    left:266px;
    top:0;
}
.layerBack4{
    left:399px;
    top:0;
}
.layerBack5{
    left:67px;
    top:115px;
}
.layerBack6{
    left:200px;
    top:115px;
}
.layerBack7{
    left:333px;
    top:115px;
}
.layerBack8{
    left:0;
    top:231px;
}
.layerBack9{
    left:2645px;
    top:231px;
}
.lichen{
    position: absolute;
    width: 632px;
    height: 420px;
    left: 44px;
    top: 475px;
}
</style>