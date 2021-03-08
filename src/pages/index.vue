<template>
    <div class="pageBox" :style="'background-image: url('+backUrl+');'">
        <img :src="trellUrl" alt="" id="shelves">
        <div class="headFrame">
            <div class="headPortrait">
                <img src="../assets/头像.png" alt="">
            </div>
            <div class="nameBox">
                <span>{{name}}</span>
            </div>
            <div class="petInf">
                <img src="../assets/等级.png" alt="">
                <img src="../assets/亲密度.png" alt="">
                <span>{{level}}</span>
                <span>{{intimacy}}</span>
            </div>
        </div>
        <div class="rightBox">
            <img src="../assets/清洁.png" alt="">
            <img src="../assets/解锁.png" alt="" @click="unlock()" v-if="lock">
            <img src="../assets/解锁2.png" alt="" @click="locked()" v-if="!lock">
        </div>
        <div id="curruntModule" @click="showModuleSelect">
            <img src="../assets/游戏模式.png" alt="" :class="active2==1?'focusC':'unfocusC'">
            <img src="../assets/学习模式.png" alt="" :class="active2==2?'focusC':'unfocusC'">
            <img src="../assets/休息模式.png" alt="" :class="active2==3?'focusC':'unfocusC'">
        </div>
        <div id="bird" v-show="lock">
               <model-obj
               src="./obj/鹦鹉.obj"
               mtl="./obj/鹦鹉.mtl"
               :lights="objlight"
               :backgroundAlpha="backgroundAlpha"
               :rotation="rotation"
               :position="position"
               :controlsOptions="controlsOptions"></model-obj>
        </div>
        <img v-if="lock" src="../assets/锁链.png" alt="" id="chains">
        <img v-if="!lock" src="../assets/锁链2.png" alt="" id="unchains">
        <div class="bottomBtn">
            <img src="../assets/相册.png" alt="" @click="toPhoto">
            <img src="../assets/装扮.png" alt="" @click="toDress">
            <img src="../assets/饲料.png" alt="" @click="addFood">
        </div>
        <div class="food">
            <img src="../assets/食盆儿.png" alt="">
            <img src="../assets/食儿.png" alt="" id="food" v-if="progress>50">
            <div id="progressBar">
                <div id="progress" :style="'width:'+ progress +'%;'"></div>
            </div>
        </div>
        <img src="../assets/人物-头像.png" alt="" srcset="" id="toPerson" @click="toPerson">
        <div id="clockBox" v-if="active2==3">
            <img src="../assets/clock.png" alt="">
            <div id="timeMm">{{mm}}</div>
            <div id="timeM">{{m}}</div>
            <div id="timeSs">{{ss}}</div>
            <div id="timeS">{{s}}</div>
            <div id="destinate">{{platformList[positionid-1].name}}</div>
        </div>
        <div class="mask" v-if="showDress||showModule||selectPosition" @click="backall()"></div>
        <transition :name="transitionName2">
            <div id="dress" v-if="showDress">
                <img src="../assets/图层 6.png" alt="" id="dressBox">
                <img src="../assets/关闭.png" alt="" @click="backDress" id="backDress">
                <img src="../assets/dressTitle.png" alt="" id="dressTitle">
                <div class="topline">
                    <div :class="active1==1?'focus':'unfouse'" @click="light(1)">背景</div>
                    <div :class="active1==2?'focus':'unfouse'" @click="light(2)">鸟架</div>
                    <div :class="active1==3?'focus':'unfouse'" @click="light(3)">羽毛</div>
                </div>
                <div class="imglist">
                    <div class="listimg" v-for="item in list" :key="item.id" @click="use(item.id)">
                        <img :src="item.src" alt="" class="listimg1">
                        <img src="../assets/正在使用.png" alt="" :class="item.state==2?'use':'use hide'" class="listimg2">
                    </div>
                </div>
                <div src="" alt="" id="saveButton">
                    <img src="../assets/button.png" alt="">
                    <h1>保存</h1>
                </div>
            </div>
        </transition>
        <div id="selectModule" v-show="showModule">
            <img src="../assets/select.png" alt="" id="selectImg">
            <div id="module1" @click="select(1)">
                <img src="../assets/module1.png" alt="" class="module">
                <img src="../assets/useModule.png" alt="" :class="active2==1?'focusModule':'unfocusM'">
            </div>
            <div id="module2" @click="select(2)">
                <img src="../assets/module2.png" alt="" class="module">
                <img src="../assets/useModule.png" alt="" :class="active2==2?'focusModule':'unfocusM'">
            </div>
            <div id="module3" @click="select(3)">
                <img src="../assets/module3.png" alt="" class="module">
                <img src="../assets/useModule.png" alt="" :class="active2==3?'focusModule':'unfocusM'">
            </div>
            <div id="saveModule" @click="saveSelect">开始</div>
        </div>
        <div id="selectPosition" v-show="selectPosition">
            <div id="positionText1">已选定:</div>
            <img src="../assets/module3.png" alt="" id="smodule3">
            <div id="positionText2">设置目的地:</div>
            <div id="positionSelect">
                <select name="public-choice" v-model="positionid">                                        
                    <option :value="item.id" v-for="item in platformList" :key="item.id">{{item.name}}</option>                                    
                </select>
            </div>
            <div id="determineLocation" @click="determineLocation">确定</div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'

import { ModelObj } from 'vue-3d-model';
export default {
    components: {
        ModelObj
    },
    data() {
        return {
            active1:1,
            active2:2,
            lock:true,
            showModule:false,
            selectPosition:false,
            name:"",
            level:"",
            backUrl:"./background/background1.png",
            trellUrl:"./background/trell1.png",
            chainsUrl:"",
            intimacy:"",
            progress:0,
            transitionName2:"slide-up",
            showDress:false,
            mm:0,
            m:0,
            ss:0,
            s:0,
            list:[{
                id:1,
                src:"./background/背景-1.png",
                state:2,
                locked:0
            },{
                id:2,
                src:"./background/背景-2.png",
                state:1,
                locked:0
            },{
                id:3,
                src:"./background/背景-3.png",
                state:1,
                locked:0
            },{
                id:4,
                src:"./background/背景-4.png",
                state:1,
                locked:0
            },{
                id:5,
                src:"./background/背景-5.png",
                state:1,
                locked:0
            },{
                id:6,
                src:"./background/背景-6.png",
                state:1,
                locked:0
            }],
            backList:[{
                id:1,
                src:"./background/background1.png",
            },{
                id:2,
                src:"./background/background2.png",
            },{
                id:3,
                src:"./background/background3.png",
            },{
                id:4,
                src:"./background/background4.png",
            }],
            backgroundList:[{
                id:1,
                src:"./background/背景-1.png",
                state:2,
                locked:0
            },{
                id:2,
                src:"./background/背景-2.png",
                state:1,
                locked:0
            },{
                id:3,
                src:"./background/背景-3.png",
                state:1,
                locked:0
            },{
                id:4,
                src:"./background/背景-4.png",
                state:1,
                locked:0
            },{
                id:5,
                src:"./background/背景-5.png",
                state:1,
                locked:0
            },{
                id:6,
                src:"./background/背景-6.png",
                state:1,
                locked:0
            }],
            trellList:[{
                id:1,
                src:"./background/trell1.png",
            },{
                id:2,
                src:"./background/trell2.png",
            },{
                id:3,
                src:"./background/trell3.png",
            },{
                id:4,
                src:"./background/trell4.png",
            },{
                id:5,
                src:"./background/trell5.png",
            }],
            trellisList:[{
                id:1,
                src:"./background/鸟架1.png",
                state:2,
                locked:0
            },{
                id:2,
                src:"./background/鸟架2.png",
                state:1,
                locked:0
            },{
                id:3,
                src:"./background/鸟架3.png",
                state:1,
                locked:0
            },{
                id:4,
                src:"./background/鸟架4.png",
                state:1,
                locked:0
            },{
                id:5,
                src:"./background/鸟架5.png",
                state:1,
                locked:0
            },{
                id:6,
                src:"./background/鸟架6.png",
                state:1,
                locked:0
            }],
            lat:0,
            lng:0,
            positionid:1,
            platformList:[{
                id:1,
                name:"第一站"
            },{
                id:2,
                name:"第二站"
            },{
                id:3,
                name:"第三站"
            },{
                id:4,
                name:"第四站"
            },{
                id:5,
                name:"第五站"
            },{
                id:6,
                name:"第六站"
            },{
                id:7,
                name:"第七站"
            },{
                id:8,
                name:"第八站"
            },{
                id:9,
                name:"第九站"
            },{
                id:10,
                name:"第十站"
            },{
                id:11,
                name:"第十一站"
            },{
                id:12,
                name:"第十二站"
            },{
                id:13,
                name:"第十三站"
            },{
                id:14,
                name:"第十四站"
            },{
                id:15,
                name:"第十五站"
            },{
                id:16,
                name:"第十六站"
            },{
                id:17,
                name:"第十七站"
            },{
                id:18,
                name:"第十八站"
            },{
                id:19,
                name:"第十九站"
            },{
                id:20,
                name:"第二十站"
            },{
                id:21,
                name:"第二十一站"
            },{
                id:22,
                name:"第二十二站"
            },{
                id:23,
                name:"第二十三站"
            }],
            //模型设置
            objlight:[
            {
                type:'AmbientLight',
                color:0xffffff,
                intensity: 1.0,
            }],
            backgroundAlpha:0,
            rotation:{ x: Math.PI /8, y: -Math.PI /8, z: 0},
            position:{ x: 0, y: -0.1, z: -0.1 },
            controlsOptions:{enabled:false}

        }
    },
    beforeMount(){
        //登陆
        var _this=this;
        axios.post(_this.$root.baseurl+'/land', {
            "number": _this.$root.Number,
            "password": _this.$root.Password
        })
        .then(function (response) {
            _this.$root.userid=response.data.userid
            _this.getInfo()
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    mounted() {
        var _this=this;
        _this.active2=_this.$root.currentModule;
        this.mm=this.$root.mm;
        this.m=this.$root.m;
        this.ss=this.$root.ss;
        this.s=this.$root.s;
        this.positionid=this.$root.positionid;
        if(_this.active2==3){
            _this.countUp();
        }
        _this.eatFood();
        
        
        /*AMap.plugin('AMap.Autocomplete', function(){
            // 实例化Autocomplete
            var autoOptions = {
            //city 限定城市，默认全国
            city: '杭州'
            }
            var autoComplete= new AMap.Autocomplete(autoOptions);
            autoComplete.search("凤起路地铁站", function(status, result) {
            // 搜索成功时，result即是对应的匹配数据
                console.log(result)
            })
        })
        */
    },
    methods:{
        eatFood(){
            var _this=this;
            setTimeout(function () {
                if(_this.progress>=10){
                    _this.progress-=10;
                    _this.eatFood();
                }else{
                    _this.progress=0;
                    _this.eatFood();
                }
                
            }, 5000)
            
        },
        getInfo(){
            var _this=this;
            axios.post(_this.$root.baseurl+'/findpet', {
                "userid": _this.$root.userid,
            })
            .then(function (response) {
                _this.name=response.data.name;
                _this.$root.level=response.data.level;
                _this.level=response.data.level;
                _this.$root.cleanning=response.data.cleanning;
                _this.intimacy=response.data.cleanning;
                _this.progress=response.data.feedfood;
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        nowLocation(){
            var _this=this;
            AMap.plugin('AMap.Geolocation', function() {
                var geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                    // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                    buttonOffset: new AMap.Pixel(10, 20),
                    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,
                    //  定位按钮的排放位置,  RB表示右下
                    buttonPosition: 'RB'
                })
                geolocation.getCurrentPosition()
                AMap.event.addListener(geolocation, 'complete', onComplete)
                AMap.event.addListener(geolocation, 'error', onError)

                function onComplete (data) {
                    _this.lat=data.position.lat;
                    _this.lng=data.position.lng;
                }

                function onError (data) {
                    // 定位出错
                }
            })
        },
        toPerson(){
            this.$router.push({ path: '/person' })
            this.$root.mm=this.mm;
            this.$root.m=this.m;
            this.$root.ss=this.ss;
            this.$root.s=this.s;
        },
        toPhoto(){
            this.$router.push({ path: '/photo' })
            this.$root.mm=this.mm;
            this.$root.m=this.m;
            this.$root.ss=this.ss;
            this.$root.s=this.s;
        },
        toDress(){
            this.showDress=true;
        },
        backDress(){
            this.showDress=false;
        },
        light(x){
            if(x!=this.active1){
                this.active1=x;
                if(x==2){
                    this.list=this.trellisList;
                }else if(x==1){
                    this.list=this.backgroundList;
                }
            }
        },
        use(x){
            
            if(this.active1==1){
                this.backUrl=this.backList[x-1].src;
                for(var i=0;i<this.backgroundList.length;i++){
                    if(this.backgroundList[i].state==2){
                        this.backgroundList[i].state=1;
                        break;
                    }
                }
                this.backgroundList[x-1].state=2;
                this.list=this.backgroundList;
            }else if(this.active1==2){
                this.trellUrl=this.trellList[x-1].src;
                for(i=0;i<this.trellisList.length;i++){
                    if(this.trellisList[i].state==2){
                        this.trellisList[i].state=1;
                        break;
                    }
                }
                this.trellisList[x-1].state=2;
                this.list=this.trellisList;
            }
        },
        select(x){
            if(x!=this.active2){
                this.active2=x;
            }
        },
        saveSelect(){
            //请求
            this.$root.currentModule=this.active2;
            if(this.active2==1){
                this.$router.push({ path: '/game1' })
            }else if(this.active2==3){
                this.selectPosition=true;
            }
            this.showModule=false;
        },
        countUp(){
            var _this=this;
            if(this.active2==3){
                if(_this.s==9){
                    if(_this.ss<5){
                        _this.s=0;
                        _this.ss++;
                    }else{
                        _this.s=0;
                        _this.ss=0;
                        if(_this.m<9){
                            _this.m++;
                        }else{
                            _this.m=0;
                            _this.mm++;
                        }
                    }
                }else if(_this.s<9){
                    _this.s++;
                }
                if(_this.s%10==0){
                    _this.nowLocation();
                    axios.post(_this.$root.baseurl+'/findgps', {
                        jindu: _this.lng,
                        weidu: _this.lat,
                        id:_this.positionid
                    })
                    .then(function (response) {
                        console.log(response.data);
                        if(response.data<10){
                            var mp3 = new Audio("./music/alarm.mp3");
                            mp3.play(); //播放 mp3这个音频对象
                            return;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
                setTimeout(function () {
                    _this.countUp();
                }, 1000)
            }
        },
        showModuleSelect(){
            this.showModule=true
        },
        
        determineLocation(){
            this.$root.positionid=this.positionid;
            this.selectPosition=false;
            this.mm=0;
            this.m=0;
            this.ss=0;
            this.s=0;
            this.countUp()
        },
        addFood(){
            var _this=this;
            setTimeout(function () {
                if(_this.progress>95) _this.progress=100;
                else _this.progress+=5;
                if(_this.progress<100) _this.addFood();
            }, 10)
        },
        backall(){
            this.showDress=false;
            this.showModule=false;
            if(this.selectPosition){
                this.selectPosition=false
                this.showModule=true;
            }
        },
        unlock(){
            this.lock=false;
        },
        locked(){
            this.lock=true;
        }
    },
}
</script>
<style  scoped>
.mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 720px;
    height: 1280px;
    background-color: black;
    opacity:0.3;
}
.use{
    position: absolute;
    left: 60px;
    top: 37px;
}
.pageBox{
    width: 720px;
    height: 1280px;
    background-size: contain;
}
.headFrame{
    position: relative;
    left: 55px;
    top: 78px;
    width:310px;
    height:100px;
    background:rgba(0,0,0,0.3);
    border-radius:50px;
}
.headPortrait{
    position: absolute;
    top: 0px;
    left: -5px;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    outline: none;
}
.headPortrait img{
    width: 100px;
    height: 100px;
}
.nameBox{
    position: absolute;
    left: 113px;
    top: 18px;
    width:150px;
    height:24px;
}
.nameBox span{
    width: 100%;
    height: 100%;
    font-size: 24px;
    line-height: 24px;
    overflow: hidden; 
    text-overflow: ellipsis; 
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    display:block;
}
.petInf{
    position: absolute;
    width: 155px;
    height: 32px;
    left: 112px;
    top: 58px;
}
.petInf *{
    position: absolute;
    float: left;
}
.petInf img{
    width: 32px;
    height: 32px;
}
.petInf :nth-child(1){
    left: 0;
    top: 0;
}
.petInf :nth-child(2){
    left: 84px;
    top: 0;
}
.petInf span{
    font-size: 24px;
    line-height: 24px;
    width: 28px;
    height: 18px;
}
.petInf :nth-child(3){
    top: 7px;
    left: 44px;
}
.petInf :nth-child(4){
    top: 7px;
    left: 127px;
}
.rightBox{
    position: absolute;
    left: 566px;
    top: 216px;
    height: auto;
    width: 104px;
}
.rightBox *{
    margin: 0 0 18px 0;
    width: 104px;
    height: 118px;
}
.food{
    position: absolute;
    left: 578px;
    top: 851px;
    width: 135px;
    height: 176px;
}
.food img{
    width: 135px;
    height: 176px;
}
#food{
    position: absolute;
    width: 63px;
    height: 28px;
    top: 32px;
    left: 32px;
}
#shelves{
    position: absolute;
    top: 132px;
    left: 0;
    width: 720px;
    height: 1008px;
}
#bird{
    position: absolute;
    top: 540px;
    left: 170px;
    width: 439px;
    height: 930px;
}
#chains{
    position: absolute;
    left:110px;
    top:958px;
    width: 211px;
    height: 173px;
}
#unchains{
    position: absolute;
    left: 110px;
    top: 958px;
    width: 49px;
    height: 315px;
}
.bottomBtn{
    position: absolute;
    left: 283px;
    top: 1135px;
    width: 402px;
    height: 116px;
}
.bottomBtn *{
    width: 104px;
    height: 116px;
    margin: 0 15px;
    cursor: pointer;
}
#progressBar{
    position: absolute;
    left: 11px;
    top: 115px;
    width: 104px;
    height: 20px;
    border:2px solid rgba(255,255,255,1);
    border-radius: 14px;
    background-color: white;
    
}
#progress{
    position: absolute;
    margin: 2px 0;
    height: 16px;
    background:rgba(185,150,87,1);
    border-radius:8px;
    border: none;
}
.headFrame span{
    color: white;
}
#toPerson{
    width: 100px;
    height: 100px;
    position: absolute;
    top: 1146px;
    left: 50px;
    cursor: pointer;
}
#dress{
    position: absolute;
    width: 720px;
    height: 628px;
    top: 652px;
    left: 0;
}
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-up-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-up-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-down-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-down-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
#backDress{
    position: absolute;
    cursor: pointer;
    left: 643px;
    top: 24px;
    width: 54px;
    height: 54px;
}
#dressTitle{
    position: absolute;
    left: 302px;
    top: 22px;
    width: 115px;
    height: 60px;
}
.topline{
    position: absolute;
    top: 120px;
    left: 216px;
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
    left: 30px;
    top: 166px;
    width: 660px;
    height: 354px;

}
.listimg{
    position: relative;
    float: left;
    margin:0 16px 43px 16px;
}
.listimg1{
    width: 188px;
    height: 134px;
}
.listimg2{
    position: absolute;
    top: 37px;
    left: 60px;
    width: 70px;
    height: 70px;
}
.hide{
    display: none;
}
#saveButton{
    position: absolute;
    text-align: center;
    top:534px;
    left: 287px;
    width: 147px;
    height: 66px;
}
#saveButton img{
    position: absolute;
    left: 0;
    top: 0;
    width: 147px;
    height: 66px;
}
#saveButton h1{
    position: absolute;
    top: -15px;
    left:32px;
    width:76px;
    font-size:36px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    cursor: pointer;
}
#dressBox{
    width:720px;
    height: 628px;
}
#selectModule,#selectImg{
    left: 0;
    position: absolute;
    width: 666px;
    height: 828px;
}
#selectModule{
    top: 122px;
}
#module1,#module2,#module3,.module{
    width: 460px;
    height: 98px;
}
.module{
    left: 0;
    top: 0;
}
#module1,#module2,#module3{
    position: absolute;
    left: 128px;
}
#module1{
    top:383px;
}
#module2{
    top:501px;
}
#module3{
    top:619px;
}
.focusModule,.unfocusM{
    position: absolute;
    width: 41px;
    height: 49px;
    top: 34.5px;
    left: 397px;
}
.unfocusM{
    display: none;
}
#saveModule{
    position: absolute;
    width: 186px;
    height: 56px;
    line-height: 56px;
    font-size: 30px;
    text-align: center;
    color: black;
    background:rgba(191,191,191,0.3);
    border-radius:28px;
    left: 268px;
    top: 745px;
    cursor: pointer;
}
#curruntModule{
    position: absolute;
    width: 104px;
    height: 116px;
    left: 566px;
    top: 505px;
}
.focusC{
    width: 104px;
    height: 116px;
}
.unfocusC{
    display: none;
}
#clockBox{
    position: absolute;
    width: 176px;
    height: 200px;
    left: 512px;
    top: 630px;
}
#clockBox img{
    position: absolute;
    width: 176px;
    height: 200px;
    left: 0;
    top: 0;
}
#destinate{
    position: absolute;
    width:176px;
    height:35px;
    font-size:36px;
    font-family:Source Han Sans TC;
    font-weight:bold;
    color:rgba(51,51,51,1);
    top: 149px;
    left: 0;
    text-align: center;
}
#timeMm{
    position: absolute;
    left: 14px;
    top: 58px;
    width: 28px;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
#timeM{
    position: absolute;
    left: 50px;
    top: 58px;
    width: 28px;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
#timeSs{
    position: absolute;
    left: 98px;
    top: 58px;
    width: 28px;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
#timeS{
    position: absolute;
    left: 135px;
    top: 58px;
    width: 28px;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
#selectPosition{
    position: absolute;
    width: 529px;
    height: 471px;
    left: 90px;
    top: 493px;
    background:rgba(255,255,255,1);
    border-radius:10px;
}
#positionText1{
    position: absolute;
    top: 34px;
    left: 35px;
    width:100px;
    height:29px;
    font-size:30px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(51,51,51,1);
}
#positionText2{
    position: absolute;
    left: 33px;
    top: 229px;
    width:165px;
    height:29px;
    font-size:30px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(51,51,51,1);
}
#smodule3{
    position: absolute;
    width: 460px;
    height: 98px;
    left: 37px;
    top: 82px;
}
#positionSelect{
    position: absolute;
    width: 464px;
    height: 56px;
    top: 279px;
    left: 33px;
}
#determineLocation{
    position: absolute;
    left: 177px;
    top: 375px;
    width:186px;
    height:56px;
    background:rgba(191,191,191,0.3);
    border-radius:28px;
    text-align: center;
    line-height: 56px;
    font-size:30px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:black;
    cursor: pointer;
}
</style>>