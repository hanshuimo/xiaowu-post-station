<template>
    
    <div class="pageBox">
        <div class="gameSbox" v-show="!start">
            <div class="topEdge">
                <div class="position">{{position}}</div>
                <div class="topText">已抵达</div>
                <img src="../assets/iconClose.png" alt="" class="close" @click="close">
            </div>
            <img src="../assets/game2.png" alt="" class="gameImg">
            <div @click="intoGame" class="startBtn">进入</div>
        </div>
        <div class="gameBox" v-if="gameinto">
            <div>
                <div id="blueBlock"></div>
                <div id="redBlock" v-show="showBlock[0].show" @click="fanhuiqu(0)"></div>
                <div id="greenBlock" v-show="showBlock[1].show" @click="fanhuiqu(1)"></div>
                <div id="yellowBlock" v-show="showBlock[2].show" @click="fanhuiqu(2)"></div>
                <div id="purpleBlock" v-show="showBlock[3].show" @click="fanhuiqu(3)"></div>
                <div id="orangeBlock" v-show="showBlock[4].show" @click="fanhuiqu(4)"></div>
                <div id="countDown" v-show="countNumber">{{sec}}</div>
            </div>
            <div id="result">
                <div id="tiptitle">游戏规则：</div>
                <div id="tip">点击开始游戏后，方块颜色发生变化，再次点击方块将颜色转变回来，颜色一共会变化五次，测试反应速度</div>
                <div class="startGame" @click="startGame()" v-show="!start">开始游戏</div>
                <div class="startGame" @click="showRank()" v-show="gameEnd">游戏结束</div>
            </div>
        </div>
        <div id="ranklistBox" v-show="showRanklist">
            <img src="../assets/ranklistImg.png" alt="" id="topback">
            <img src="../assets/人物-头像.png" alt="" id="headImg">
            <div id="timeTitle">反射弧</div>
            <div id="rankTitle">排名</div>
            <div id="timeNumber">{{timeNumber}}ms</div>
            <div id="rankNumber">{{rankNumber}}</div>
            <div id="gameReward">
                <div id="getText1">获得奖励</div>
                <img src="../assets/food.png" alt="" id="getImg">
                <div id="getText2">*10</div>
            </div>
            <img src="../assets/trophy1.png" alt="" id="trophy1">
            <img src="../assets/trophy2.png" alt="" id="trophy2">
            <img src="../assets/trophy3.png" alt="" id="trophy3">
            <div id="userList">
                <div class="listUser" v-for="item in rankUser" :key="item.id">
                    <img class="listHead" :src="item.img" alt="">
                    <div class="userName">{{item.name}}</div>
                    <div class="userTime">{{item.time}}ms</div>
                </div>
            </div>
            <img src="../assets/button-重新开始.png" alt="" @click="reStart()" id="reStart">
            <img src="../assets/button-退出游戏.png" alt="" @click="close()" id="closeGame">
        </div>
        <div id="advertisementBox" v-show="showAd">
            <img src="../assets/closeAd.png" alt="" id="closeAd" @click="closeAd()">
            <img src="../assets/广告图.png" alt="" id="advertisementImg">
        </div>
    </div>
</template>
<style scoped>
.pageBox{
    position: absolute;
    width: 720px;
    height: 1280px;
    background-size: contain;
    background-color:rgb(255, 250, 205);
}
.gameSbox{
    width: 529px;
    height: 577px;
    position: absolute;
    left: 95px;
    top: 320px;
    background-image: url(../assets/弹出窗口-背景板.png);
    background-size: contain;
}
.topEdge{
    width: 529px;
    height: 129px;
    top: 0;
    left: 0;
}
.position{
    position: absolute;
    top: 32px;
    width: 529px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    font-size:36px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(255,255,255,1);
}
.topText{
    position: absolute;
    top: 84px;
    width: 529px;
    height:24px;
    line-height: 24px;
    font-size:24px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(255,255,255,1);
}
.close{
    position: absolute;
    left: 471px;
    top: 22px;
    width: 36px;
    height: 36px;
    cursor: pointer;
}
.gameImg{
    position: absolute;
    left: 72px;
    top: 192px;
    width: 385px;
    height: 249px;
}
.startBtn{
    position: absolute;
    left: 172px;
    top: 485px;
    width:186px;
    height:56px;
    line-height: 56px;
    font-size:30px;
    text-align: center;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(51,51,51,1);
    background:rgba(191,191,191,0.3);
    border-radius:28px;
    cursor: pointer;
}
.gameBox{
    position: absolute;
    top: 108px;
    left: 95px;
    width: 530px;
    height: 854px;
    background-color: white;
}
#blueBlock,#redBlock,#greenBlock,#yellowBlock,#purpleBlock,#orangeBlock{
    position: absolute;
    width: 514px;
    height: 574px;
    left: 8px;
    top: 8px;
}
#blueBlock{
    background:linear-gradient(88deg,rgba(69,172,231,1),rgba(123,206,246,1));
}
#redBlock{
    background:linear-gradient(88deg,rgb(228, 15, 15),rgb(248, 63, 63));
}
#greenBlock{
    background:linear-gradient(88deg,rgb(51, 228, 15),rgb(141, 224, 116));
}
#yellowBlock{
    background:linear-gradient(88deg,rgb(228, 189, 15),rgb(247, 245, 136));
}
#purpleBlock{
    background:linear-gradient(88deg,rgb(125, 15, 228),rgb(188, 153, 221));
}
#orangeBlock{
    background:linear-gradient(88deg,rgb(235, 96, 3),rgb(230, 177, 152));
}
#result{
    position: absolute;
    width: 476px;
    height: 207px;
    top: 628px;
    left: 27px;
}
#tiptitle{
    position: absolute;
    top: 0;
    left: 0;
    width:160px;
    height:30px;
    line-height: 30px;
    font-size:32px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(51,51,51,1);
    line-height:45px;
}
#tip{
    text-align: center;
    position: absolute;
    top: 60px;
    width:320px;
    left: 105px;
    line-height: 21px;
    font-size:22px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(230,0,0,1);
}
.startGame{
    position: absolute;
    left: 172px;
    top: 151px;
    width: 186px;
    height: 56px;
    text-align: center;
    line-height: 56px;
    font-size:30px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(51,51,51,1);
    background:rgba(191,191,191,0.3);
    border-radius:28px;
    cursor: pointer;
}
#countDown{
    position: absolute;
    left: 242px;
    top: 259px;
    width:45px;
    height:75px;
    font-size:100px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(255,255,255,1);
}
#ranklistBox{
    position: absolute;
    left: 95px;
    top: 120px;
    width:530px;
    height:856px;
    background:rgba(255,255,255,1);
    border-radius:10px;
}
#topback{
    position: absolute;
    left: 0;
    top: 0;
    width: 529px;
    height: 329px;
}
#headImg{
    position: absolute;
    left: 47px;
    top: 51px;
    height: 100px;
    width: 100px;
}
#timeTitle{
    position: absolute;
    left: 230px;
    top: 61px;
    width:90px;
    height:29px;
    font-size:30px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(255,255,255,1);
}
#rankTitle{
    position: absolute;
    left: 385px;
    top: 61px;
    width:61px;
    height:29px;
    font-size:30px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(255,255,255,1);
}
#timeNumber{
    position: absolute;
    left: 210px;
    top: 122px;
    text-align: center;
    width:130px;
    height:22px;
    font-size:30px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(255,255,255,1);
}
#rankNumber{
    position: absolute;
    left: 370px;
    top: 123px;
    text-align: center;
    width:90px;
    height:22px;
    font-size:30px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(255,255,255,1);
}
#gameReward{
    position: absolute;
    left: 182px;
    top: 185px;
    width:306px;
    height:84px;
    border:1px solid rgba(255,255,255,1);
    border-radius:40px;
}
#getText1{
    position: absolute;
    left: 29px;
    top: 30px;
    width:96px;
    height:23px;
    font-size:24px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(255,255,255,1);
}
#getImg{
    position: absolute;
    left: 153px;
    top: 15px;
    width: 57px;
    height: 55px;
}
#getText2{
    position: absolute;
    left: 227px;
    top: 30px;
    width:45px;
    height:24px;
    font-size:30px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(255,255,255,1);
}
#trophy1,#trophy2,#trophy3{
    position: absolute;
    left: 38px;
    width: 18px;
    height: 23px;
}
#trophy1{
    top: 363px;
}
#trophy2{
    top: 433px;
}
#trophy3{
    top: 505px;
}
#userList{
    position: absolute;
    top: 327px;
    left: 80px;
    width: 411px;
    height: 383px;
}
.listUser{
    margin: 23px 0;
    left: 0;
    width: 411px;
    height: 49px;
}
.listHead{
    float: left;
    width: 50px;
    height: 49px;
}
.userName{
    float: left;
    left: 72px;
    margin-top: 12px;
    height:19px;
    font-size:20px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(39,37,35,1);
}
.userTime{
    float: right;
    right: 0;
    margin-top: 12px;
    height:15px;
    font-size:20px;
    font-family:Source Han Sans TC;
    font-weight:300;
    color:rgba(39,37,35,1);
}
#reStart{
    left: 43px;
}
#closeGame{
    left: 306px;
}
#reStart,#closeGame{
    position: absolute;
    border:1px dashed black;
    top: 763px;
    width: 186px;
    height: 56px;
    cursor: pointer;
}
#advertisementBox{
    position: absolute;
    top:89px;
    left: 37px;
    width: 646px;
    height: 1102px;
    border-radius: 10px;
    background-color: white;
}
#closeAd{
    position: absolute;
    top: 29px;
    right: 29px;
    width: 28px;
    height: 29px;
    cursor: pointer;
}
#advertisementImg{
    position: absolute;
    left: 12px;
    top:87px;
    width: 622px;
    height: 1003px;
}
</style>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            position:"第X站",
            gameinto:false,
            start:false,
            gameEnd:false,
            countNumber:false,
            sec:4,
            rightAnswer:0,
            showRanklist:false,
            showAd:false,

            timeNumber:0,
            rankNumber:1300,
            
            startTime:0,

            showBlock:[{
                id:1,
                show:false
            },{
                id:2,
                show:false
            },{
                id:3,
                show:false
            },{
                id:4,
                show:false
            },{
                id:5,
                show:false
            }],
            
            rankUser:[{
                id:1,
                img:"./rank/head1.png",
                name:"陆三岁",
                time:1544.2
            },{
                id:2,
                img:"./rank/head2.png",
                name:"沈春山",
                time:1545.2
            },{
                id:3,
                img:"./rank/head3.png",
                name:"北北",
                time:1546.2
            },{
                id:4,
                img:"./rank/head4.png",
                name:"芝麻酥酥",
                time:1544.2
            },{
                id:5,
                img:"./rank/head5.png",
                name:"Rush Cho",
                time:1544.2
            }]
        }
    },
    methods:{
        close(){
            this.$router.push({ path: '/index' })
        },
        intoGame(){
            this.gameinto=true;
            
        },
        countdown: function () {
				// 用结束时间减去当前时间获得倒计时时间戳
				const msec = this.sec
				//给数据赋值
				this.sec = msec-1
				//定义this指向
				const _this = this
                // 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
                if(msec>1){
                    setTimeout(function () {
                        _this.countdown()
                    }, 1000)
                }else if(msec==1){
                    setTimeout(function () {
                        _this.countNumber=false;
                        _this.gameStart();
                    }, 1000)
                }
				
        },
        startGame(){
            this.countNumber=true;
            this.start=true;
            this.countdown();
        },
        gameStart(){
            var _this=this;
            _this.fanyinghu();
        },
        fanyinghu(){
            var _this=this;
            if(_this.rightAnswer<5){
                var a=Math.floor(Math.random()*5000)+1000;
                setTimeout(function () {
                        _this.showBlock[_this.rightAnswer].show=true;
                        _this.startTime=new Date();
                }, a)
            }else{
                this.gameEnd=true;
            }
        },
        fanhuiqu(index){
            var _this=this;
            _this.showBlock[index].show=false;
            _this.timeNumber+=(new Date()-_this.startTime);
            _this.rightAnswer++;
            _this.fanyinghu();
        },
        showRank(){
            var _this=this;
            axios.post(_this.$root.baseurl+'/changeranking', {
                gametype:2,
                scoretime:_this.timeNumber,
                userid:_this.$root.userid
            })
            .then(function (response) {
                _this.rankNumber=response.data.ranking
            })
            .catch(function (error) {
                console.log(error);
            });
            this.gameinto=false;
            this.showRanklist=true;
        },
        reStart(){
            this.showAd=true;
            this.timeNumber=0;
            this.gameinto=false;
            this.start=false;
            this.gameEnd=false;
            this.countNumber=false;
            this.sec=4;
            this.rightAnswer=0;
            this.showRanklist=false;
        },
        closeAd(){
            this.showAd=false;
        },
    }
}
</script>
