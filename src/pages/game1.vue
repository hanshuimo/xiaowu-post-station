<template>
    
    <div class="pageBox">
        <div class="gameSbox" v-show="!start">
            <div class="topEdge">
                <div class="position">{{position}}</div>
                <div class="topText">已抵达</div>
                <img src="../assets/iconClose.png" alt="" class="close" @click="close">
            </div>
            <img src="../assets/game1.png" alt="" class="gameImg">
            <div @click="intoGame" class="startBtn">进入</div>
        </div>
        <div class="gameBox" v-if="gameinto">
            <div>
                <img src="../assets/game1-background.png" alt="" id="game1Back">
                
                <table  cellpadding="1" cellspacing="0">
                    <tr>
                        <td><img src="../assets/copyBule.png" id="img0" @click="fanpai(0)" v-show="block[0].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img1" @click="fanpai(1)" v-show="block[1].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img2" @click="fanpai(2)" v-show="block[2].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img3" @click="fanpai(3)" v-show="block[3].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img4" @click="fanpai(4)" v-show="block[4].now"/> </td>
                    </tr>
                    <tr>
                        <td><img src="../assets/copyBule.png" id="img5" @click="fanpai(5)" v-show="block[5].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img6" @click="fanpai(6)" v-show="block[6].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img7" @click="fanpai(7)" v-show="block[7].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img8" @click="fanpai(8)" v-show="block[8].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img9" @click="fanpai(9)" v-show="block[9].now"/> </td>
                    </tr>
                    <tr>
                        <td><img src="../assets/copyBule.png" id="img10" @click="fanpai(10)" v-show="block[10].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img11" @click="fanpai(11)" v-show="block[11].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img12" @click="fanpai(12)" v-show="block[12].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img13" @click="fanpai(13)" v-show="block[13].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img14" @click="fanpai(14)" v-show="block[14].now"/> </td>
                    </tr>
                    <tr>
                        <td><img src="../assets/copyBule.png" id="img15" @click="fanpai(15)" v-show="block[15].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img16" @click="fanpai(16)" v-show="block[16].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img17" @click="fanpai(17)" v-show="block[17].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img18" @click="fanpai(18)" v-show="block[18].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img19" @click="fanpai(19)" v-show="block[19].now"/> </td>
                    </tr>
                    <tr>
                        <td><img src="../assets/copyBule.png" id="img20" @click="fanpai(20)" v-show="block[20].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img21" @click="fanpai(21)" v-show="block[21].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img22" @click="fanpai(22)" v-show="block[22].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img23" @click="fanpai(23)" v-show="block[23].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img24" @click="fanpai(24)" v-show="block[24].now"/> </td>
                    </tr>
                    <tr>
                        <td><img src="../assets/copyBule.png" id="img25" @click="fanpai(25)" v-show="block[25].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img26" @click="fanpai(26)" v-show="block[26].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img27" @click="fanpai(27)" v-show="block[27].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img28" @click="fanpai(28)" v-show="block[28].now"/> </td>
                        <td><img src="../assets/copyBule.png" id="img29" @click="fanpai(29)" v-show="block[29].now"/> </td>
                    </tr>
                </table>
                <div id="countDown" v-show="countNumber">{{sec}}</div>
            </div>
            <div id="result">
                <div id="tiptitle">游戏规则：</div>
                <div id="tip">点击开始游戏后，随机会有方块被翻开，记忆它们的位置，重新翻开即可获得游戏胜利。</div>
                <div class="startGame" @click="startGame()" v-show="!start">开始游戏</div>
                <div class="startGame" @click="showRank()" v-show="gameEnd">游戏胜利</div>
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
#game1Back{
    position: absolute;
    left: 0;
    top: 15px;
    width: 530px;
    height: 590px;
}
table tr td img{
    width: 103px;
    height: 96px;
}
table{
    position: absolute;
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
    text-align: center;
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

            timeNumber:614.6,
            rankNumber:1300,
            
            startTime:0,

            answer:[1,2,3,4,5,6,7,8,9],
            block:[{
                id:0,
                now:true,
                answer:true,
            },{
                id:1,
                now:true,
                answer:true,
            },{
                id:2,
                now:true,
                answer:true,
            },{
                id:3,
                now:true,
                answer:true,
            },{
                id:4,
                now:true,
                answer:true,
            },{
                id:5,
                now:true,
                answer:true,
            },{
                id:6,
                now:true,
                answer:true,
            },{
                id:7,
                now:true,
                answer:true,
            },{
                id:8,
                now:true,
                answer:true,
            },{
                id:9,
                now:true,
                answer:true,
            },{
                id:10,
                now:true,
                answer:true,
            },{
                id:11,
                now:true,
                answer:true,
            },{
                id:12,
                now:true,
                answer:true,
            },{
                id:13,
                now:true,
                answer:true,
            },{
                id:14,
                now:true,
                answer:true,
            },{
                id:15,
                now:true,
                answer:true,
            },{
                id:16,
                now:true,
                answer:true,
            },{
                id:17,
                now:true,
                answer:true,
            },{
                id:18,
                now:true,
                answer:true,
            },{
                id:19,
                now:true,
                answer:true,
            },{
                id:20,
                now:true,
                answer:true,
            },{
                id:21,
                now:true,
                answer:true,
            },{
                id:22,
                now:true,
                answer:true,
            },{
                id:23,
                now:true,
                answer:true,
            },{
                id:24,
                now:true,
                answer:true,
            },{
                id:25,
                now:true,
                answer:true,
            },{
                id:26,
                now:true,
                answer:true,
            },{
                id:27,
                now:true,
                answer:true,
            },{
                id:28,
                now:true,
                answer:true,
            },{
                id:29,
                now:true,
                answer:true,
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
            var i=0,a;
            var _this=this;
            this.gameinto=true;
            while(i<10){
                a=Math.floor(Math.random()*30);
                if(_this.block[a].answer==true){
                    _this.block[a].answer=false;
                    _this.answer[i]=a;
                    i++;
                }
            }
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
            var i;
            var _this=this;
            for(i=0;i<10;i++){
                _this.block[_this.answer[i]].now=false;
            }
            this.countdown();
        },
        gameStart(){
            var i;
            var _this=this;
            for(i=0;i<10;i++){
                _this.block[_this.answer[i]].now=true;
            }
            _this.startTime=new Date();
        },
        fanpai(id){
            var _this=this;
            _this.block[id].now=false;
            if(_this.block[id].answer==true){
                setTimeout(function () {
                    _this.block[id].now=true;
                }, 1000)
            }else{
                _this.rightAnswer++;
                if(_this.rightAnswer==10){
                    this.gameEnd=true;
                    _this.timeNumber=new Date()-_this.startTime
                    
                }
            }
        },
        showRank(){
            var _this=this;
            axios.post(_this.$root.baseurl+'/changeranking', {
                gametype:1,
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
            this.gameinto=false;
            this.gameEnd=false;
            this.countNumber=false;
            this.sec=4;
            this.rightAnswer=0;
            this.showRanklist=false;
            var i;
            for(i=0;i<10;i++){
                this.block[this.answer[i]].now=true;
            }
        },
        closeAd(){
            this.showAd=false;
            this.start=false;
        },
    }
}
</script>
