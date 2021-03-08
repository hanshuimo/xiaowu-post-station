<template>
    <div class="pageBox">
        
        <div class="headFrame">
            <div class="headPortrait">
                <img src="../assets/人物-头像.png" alt="">
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
            <img src="../assets/成就.png" alt="" @click="toAchievement">
        </div>
        <div id="curruntModule" @click="showModuleSelect">
            <img src="../assets/游戏模式.png" alt="" :class="active2==1?'focusC':'unfocusC'">
            <img src="../assets/学习模式.png" alt="" :class="active2==2?'focusC':'unfocusC'">
            <img src="../assets/休息模式.png" alt="" :class="active2==3?'focusC':'unfocusC'">
        </div>
        <img src="../assets/人物.png" alt="" id="person">
        
        <div class="bottomBtn">
            <img src="../assets/通知.png" alt="">
            <img src="../assets/好友.png" alt="">
            <img src="../assets/任务.png" alt="" @click="toMission">
        </div>
        
        <img src="../assets/鹦鹉-头像.png" alt="" id="leftbottom" @click="toIndex">
        <div id="clockBox" v-if="active2==3">
            <img src="../assets/clock.png" alt="">
            <div id="timeMm">{{mm}}</div>
            <div id="timeM">{{m}}</div>
            <div id="timeSs">{{ss}}</div>
            <div id="timeS">{{s}}</div>
            <div id="destinate">{{platformList[positionid-1].name}}</div>
        </div>
        <div class="mask" v-if="showMission||addMission||addMission2||showModule||selectPosition" @click="backall()"></div>
        <transition :name="transitionName3">
            <div class="missionWindow" v-if="showMission">
                <img src="../assets/关闭.png" alt="" class="backMission" @click="backMission">
                <img src="../assets/mission.png" alt="" id="missionTitle">
                <div class="missionBox">
                    <div class="mission" v-for="item in mission" :key="item.key">
                        <img :src="item.img" alt="" class="missionImg">
                        <p class="missionName">{{item.name}}</p>
                        <div id="progressBar">
                            <div id="progress" :style="'width:'+ item.progress +'%;'"></div>
                        </div>
                        <div class="completeButton" v-if="item.complete" @click="completeTask(item.id)">
                            <p>完成</p>
                        </div>
                        <div class="incompleteButton" v-if="!item.complete">
                            <p>未完成</p>
                        </div>
                        <div class="incompleteButton" v-if="item.reward" @click="completeTask(item.id)">
                            <p>已领取</p>
                        </div>
                    </div>
                </div>
                <img src="../assets/addMission.png" alt="" class="addBtn" @click="showAddmission">
            </div>
        </transition>
        <transition :name="transitionName4">
            <div class="missionWindow" v-show="addMission">
                <img src="../assets/关闭.png" alt="" class="backMission" @click="backAdd">
                <img src="../assets/addTitle.png" alt="" class="newMissionTitlt">
                <div class="line"></div>
                <div id="addMissionText1">任务名称</div>
                <img src="../assets/虚线边框.png" alt="" id="addMissionImg1">
                <div id="activeIcon" >
                    <img v-if="selectIcon==1" src="../assets/icon1.png" alt="">
                    <img v-if="selectIcon==2" src="../assets/icon2.png" alt="">
                    <img v-if="selectIcon==3" src="../assets/icon3.png" alt="">
                    <img v-if="selectIcon==4" src="../assets/icon4.png" alt="">
                    <img v-if="selectIcon==5" src="../assets/icon5.png" alt="">
                    <img v-if="selectIcon==6" src="../assets/icon6.png" alt="">
                    <img v-if="selectIcon==7" src="../assets/icon7.png" alt="">
                </div>
                <input type="text" class="inputMissionName" placeholder="请输入设定的任务名称" v-model="MissionName">
                <div id="addMissionText2">图标</div>
                <div id="addMissionImgList">
                    <img src="../assets/icon1.png" alt="" @click="selecticon(1)">
                    <img src="../assets/icon2.png" alt="" @click="selecticon(2)">
                    <img src="../assets/icon3.png" alt="" @click="selecticon(3)">
                    <img src="../assets/icon4.png" alt="" @click="selecticon(4)">
                    <img src="../assets/icon5.png" alt="" @click="selecticon(5)">
                    <img src="../assets/icon6.png" alt="" @click="selecticon(6)">
                    <img src="../assets/icon7.png" alt="" @click="selecticon(7)">
                </div>
                <div id="addMissionText3">鼓励语</div>
                <input type="text" id="addMissionInput3" placeholder="给自己一点完成目标的鼓励吧~">
                <img src="../assets/下一步.png" alt="" id="addMissionNext" @click="addMissionNext()">
            </div>
        </transition>
        <transition :name="transitionName4">
            <div class="missionWindow" v-show="addMission2">
                <img src="../assets/back2.png" alt="" class="backMission1" @click="backMission1">
                <img src="../assets/关闭.png" alt="" class="backMission" @click="backAdd2">
                <img src="../assets/addTitle.png" alt="" class="newMissionTitlt">
                <div class="line"></div>
                <div id="addMission2Text1">频率</div>
                <div class="selectBtn activeSelect" id="selectBtn1">按天</div>
                <div class="selectBtn unactiveSelect" id="selectBtn2">按周</div>
                <div id="addMission2Text2">重复</div>
                <div class="selectBtn activeSelect" id="selectBtn3">周一</div>
                <div class="selectBtn activeSelect" id="selectBtn4">周二</div>
                <div class="selectBtn activeSelect" id="selectBtn5">周三</div>
                <div class="selectBtn activeSelect" id="selectBtn6">周四</div>
                <div class="selectBtn activeSelect" id="selectBtn7">周五</div>
                <div class="selectBtn unactiveSelect" id="selectBtn8">周六</div>
                <div class="selectBtn unactiveSelect" id="selectBtn9">周日</div>
                <div id="addMission2Text3">提醒</div>
                <img src="../assets/添加.png" alt="" id="addTip">
                <img src="../assets/保存.png" alt="" id="saveNewMission" @click="saveNewMission()">
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
        <div id="reward" v-show="showReward">
            <div id="rewardName">{{reward.name}}</div>
            <div id="rewardText1">恭喜获得</div>
            <img :src="reward.medal" alt="" id="rewardMedal"> 
            <div id="rewardText2">勋章:{{reward.medalName}}</div>
            <img :src="reward.rewardImg" alt="" id="rewardImg">
            <div>{{reward.rewardName}}</div>
            <img src="../assets/rewardBack.png" alt="" id="rewardBack" @click="closeReward">
            <img src="../assets/share.png" alt="" id="shareBtn">
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
.pageBox{
    width: 720px;
    height: 1280px;
    background-image: url("../assets/室内-背景.png");
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
    height: 120px;
    width: 104px;
}
.rightBox img{
    width: 104px;
    height: 116px;
}
.rightBox *{
    margin: 0 0 18px 0;
    cursor: pointer;
}

#person{
    left: 167px;
    top: 154px;
    width: 393px;
    height: 1082px;
}
#chains{
    position: absolute;
    left:110px;
    top:958px;
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
#leftbottom{
    position: absolute;
    left: 53px;
    top: 1147px;
    cursor: pointer;
    width: 100px;
    height: 100px;
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
.missionWindow{
    position: absolute;
    width:720px;
    height:640px;
    background:rgba(255,253,247,1);
    border-radius:40px 40px 0px 0px;
    top: 640px;
    left: 0;
}
.backMission{
    position: absolute;
    left: 638px;
    top: 21px;
    cursor: pointer;
    width: 54px;
    height: 51px;
}
.backMission1{
    position: absolute;
    width: 39px;
    height: 55px;
    left: 27px;
    top: 24px;
}
#missionTitle{
    position: absolute;
    top: 21px;
    left: 302px;
    width: 115px;
    height: 61px;
}
.missionBox{
    position: absolute;
    top: 90px;
    left: 30px;
    width: 660px;
    height: 512px;
}
.mission{
    position: relative;
    margin: 9px 0 0 0;
    width: 100%;
    height: 119px;
    background:rgba(255,253,247,1);
    box-shadow:0px 12px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius:20px;
}
.missionImg{
    position:absolute;
    left: 29px;
    top: 21px;
    width: 74px;
    height: 79px;
}
.missionName{
    position:absolute;
    top: 34px;
    left: 126px;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:400;
    margin: 0;
}
#progressBar{
    position: absolute;
    left: 126px;
    top: 80px;
    width: 380px;
    height: 5px;
    background:rgba(229,229,229,1);
    border-radius:3px;  
}
#progress{
    position: absolute;
    height: 5px;
    background:rgba(138,114,95,1);
    border-radius:3px;
    border: none;
}
.completeButton{
    position: absolute;
    left: 540px;
    top: 39px;
    width:100px;
    height:50px;
    background:rgba(138,114,95,1);
    border-radius:25px;
}
.completeButton p{
    position: absolute;
    top: 14px;
    left: 24px;
    margin: 0;
    width:49px;
    height:23px;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
}
.incompleteButton{
    position: absolute;
    left: 540px;
    top: 39px;
    width:100px;
    height:50px;
    background:rgba(228,220,198,1);
    border-radius:25px;
}
.incompleteButton p{
    position: absolute;
    top: 13px;
    left: 12px;
    margin: 0;
    width:75px;
    height:23px;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
}
.completeButton,.incompleteButton{
    cursor: pointer;
}
#curruntModule{
    position: absolute;
    width: 104px;
    height: 116px;
    left: 566px;
    top: 505px;
    cursor: pointer;
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
.focusC{
    width: 104px;
    height: 116px;
}
.unfocusC{
    display: none;
}
#selectModule,#selectImg{
    left: 0;
    position: absolute;
    width: 666px;
    height: 828px;
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
#reward{
    position: absolute;
    top: 0;
    left: 0;
    width: 720px;
    height: 1280px;
    background-color:rgba(0, 0, 0, 0.4);
}
#rewardName{
    position: absolute;
    height:37px;
    line-height: 37px;
    width: 720px;
    text-align: center;
    top: 155px;
    font-size:36px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(255,253,247,1);
}
#rewardText1{
    position: absolute;
    top: 222px;
    width: 720px;
    text-align: center;
    height:49px;
    line-height: 49px;
    font-size:48px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(255,253,247,1);
}
#rewardMedal{
    position: absolute;
    width: 206px;
    height: 238px;
    top: 326px;
    left: 257px;
}
#rewardText2{
    position: absolute;
    top: 592px;
    width:720px;
    text-align: center;
    height:31px;
    line-height: 31px;
    font-size:30px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(250,205,137,1);
    letter-spacing:3px
}
#rewardImg{
    position: absolute;
    left: 169px;
    top: 715px;
    width: 374px;
    height: 248px;

}
#rewardBack{
    position: absolute;
    width: 90px;
    height: 90px;
    left: 214px;
    top: 1120px;
    cursor: pointer;
}
#shareBtn{
    position: absolute;
    width: 90px;
    height: 90px;
    left: 422px;
    top: 1120px;
}
.addBtn{
    position: absolute;
    width: 80px;
    height: 80px;
    left: 320px;
    top: 543px;
    cursor: pointer;
}
.newMissionTitlt{
    position: absolute;
    left: 279px;
    top: 27px;
    width:162px;
    height:61px;
    font-size:48px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(255,255,255,1);
    -webkit-text-stroke:4px undefined;
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
.line{
    position: absolute;
    top: 103px;
    left: 0;
    width:719px;
    height:1px;
    background:rgba(138,114,95,1);
}
.inputMissionName{
    position: absolute;
    left: 187px;
    top: 192px;
    width:483px;
    height:50px;
    background:rgba(239,237,230,1);
    border-radius:25px;
    border: 0;
}
#addMissionText1{
    position: absolute;
    left: 49px;
    top: 124px;
    width:101px;
    height:23px;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(138,114,95,1);
}
#addMissionImg1{
    position: absolute;
    left: 50px;
    top: 167px;
    width: 100px;
    height: 100px;
}
#activeIcon{
    position: absolute;
    left: 50px;
    top: 167px;
    width: 100px;
    height: 100px;
}
#activeIcon img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    height: 100px;
}
#addMissionText2{
    position: absolute;
    left: 49px;
    top: 288px;
    width:50px;
    height:22px;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(138,114,95,1);
}
#addMissionImgList{
    position: absolute;
    width: 637px;
    height: 70px;
    left: 50px;
    top: 330px;
}
#addMissionImgList img{
    width: 70px;
    height: 70px;
    margin: 0 21px 0 0;
}
#addMissionText3{
    position: absolute;
    left: 49px;
    top: 419px;
    width:77px;
    height:23px;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(138,114,95,1);
}
#addMissionInput3{
    position: absolute;
    width:620px;
    height:87px;
    left: 50px;
    top: 462px;
    background:rgba(239,237,230,1);
    border-radius:10px;
    border: 0;
}
#addMissionNext{
    position: absolute;
    left: 304px;
    top: 569px;
    width: 112px;
    height: 51px;
    cursor: pointer;
}
#addMission2Text1,#addMission2Text2,#addMission2Text3{
    position: absolute;
    left: 49px;
    width:51px;
    height:24px;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(138,114,95,1);
}
#addMission2Text1{
    top: 123px;
}
#addMission2Text2{
    top: 235px;
}
#addMission2Text3{
    top: 420px;
}
.selectBtn{
    position: absolute;
    width:108px;
    height:50px;
    line-height: 50px;
    text-align: center;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    border-radius:10px;
}
.activeSelect{
    background:rgba(138,114,95,1);
}
.unactiveSelect{
    background:rgba(228,220,198,1);
}
#addTip{
    position: absolute;
    left: 50px;
    top: 462px;
    width: 108px;
    height: 50px;
}
#selectBtn1{
    left: 50px;
    top: 167px;
}
#selectBtn2{
    left: 178px;
    top: 167px;
}
#selectBtn3{
    left: 50px;
    top: 279px;
}
#selectBtn4{
    left: 178px;
    top: 279px;
}
#selectBtn5{
    left: 306px;
    top: 279px;
}
#selectBtn6{
    left: 434px;
    top: 279px;
}
#selectBtn7{
    left: 562px;
    top: 279px;
}
#selectBtn8{
    left: 50px;
    top: 349px;
}
#selectBtn9{
    left: 178px;
    top: 349px;
}
#saveNewMission{
    position: absolute;
    left: 304px;
    top: 569px;
    width: 112px;
    height: 51px;

}
</style>>
    
<script>
import axios from 'axios'
export default {
    data() {
        return {
            name:"阿秋",
            level:5,
            showModule:false,
            selectPosition:false,
            intimacy:34,
            transitionName3:"slide-up",
            transitionName4:"slide-up",
            showMission:false,
            addMission:false,
            addMission2:false,
            showReward:false,
            active2:3,
            mm:0,
            m:0,
            ss:0,
            s:0,
            selectIcon:1,
            MissionName:"",
            mission:[{
                id:1,
                name:"任务一",
                complete:false,
                progress:20,
                reward:false,
                img:"./missionImg/icon2.png"
            },{
                id:2,
                name:"任务三",
                complete:true,
                progress:100,
                reward:false,
                img:"./missionImg/icon2.png"
            }],
            reward:{
                id:2,
                name:"每日饲料任务完成50次",
                medal:"./layer/Layer012.png",
                medalName:"鹦鹉的喜爱",
                rewardImg:"./reward/地铁券.png",
                rewardName:"3元地铁券*1"
            },
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
        }
    },
    methods:{
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
        toIndex(){
            this.$router.push({ path: '/index' })
            this.$root.mm=this.mm;
            this.$root.m=this.m;
            this.$root.ss=this.ss;
            this.$root.s=this.s;
        },
        toMission(){
            this.showMission=true;
        },
        backMission(){
            this.showMission=false;
        },
        showAddmission(){
            this.addMission=true;
        },
        backAdd(){
            this.addMission=false;
        },
        backAdd2(){
            this.addMission2=false;
        },
        backMission1(){
            this.addMission=true;
            this.addMission2=false;
        },
        toAchievement(){
            this.$router.push({ path: '/achievement' })
            this.$root.mm=this.mm;
            this.$root.m=this.m;
            this.$root.ss=this.ss;
            this.$root.s=this.s;
        },
        completeTask(id){
            this.reward.id=id;
            this.mission[id-1].reward=true;
            this.showReward=true;
        },
        closeReward(){
            this.showReward=false;
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
                this.$router.push({ path: '/game2' })
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
            this.selectPosition=false;
            this.mm=0;
            this.m=0;
            this.ss=0;
            this.s=0;
            this.$root.positionid=this.positionid;
            this.countUp()
        },
        selecticon(id){
            this.selectIcon=id;
        },
        addMissionNext(){
            this.addMission=false;
            this.addMission2=true;
        },
        saveNewMission(){
            var newMission={
                id:0,
                name:"",
                complete:false,
                progress:0,
                reward:false,
                img:"./missionImg/icon1.png"
            };
            newMission.id=this.mission.length+1;
            newMission.name=this.MissionName;

            newMission.img="./missionImg/icon"+this.selectIcon+".png";
            this.mission.push(newMission);
            this.addMission=false;
            this.addMission2=false;
        },
        backall(){
            this.showMission=false;
            this.showModule=false;
            if(this.selectPosition){
                this.selectPosition=false
                this.showModule=true;
            }
            if(this.addMission){
                this.addMission=false;
                this.showMission=true;
            }
            if(this.addMission2){
                this.addMission2=false;
                this.addMission=true;
            }
        }
    },
    mounted(){
        var _this=this;
        _this.active2=_this.$root.currentModule;
        this.mm=this.$root.mm;
        this.m=this.$root.m;
        this.ss=this.$root.ss;
        this.s=this.$root.s;
        this.positionid=this.$root.positionid;
        _this.level=_this.$root.level;
        _this.intimacy=_this.$root.cleanning;
        if(_this.active2==3){
            _this.countUp();
        }
    }
    
}
</script>