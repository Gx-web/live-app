<template>
    <div>
        <div class="top" >

        </div>
        <swiper :options="swiperOption"
                    ref="mySwiper">
                <swiper-slide class="slide">dfdf</swiper-slide>
                <swiper-slide class="slide">
                    <div class="header">
                        <div class="infor">
                            <div @click="usershow=true">
                                <img :src="userdata.data.userimage">
                            </div>
                            <div>
                                <p>{{userdata.data.username}}</p>
                                <span>总人气：{{data.audiences.length}}</span>
                            </div>
                        </div>
                        <div class="focus">
                            <span>关注+</span>
                        </div>
                        <div class="user" >
                            <div v-for="(n,i) in data.audiences">
                                <img :src="n.userimage">
                            </div>
                        </div>
                    </div>
                    <div class="center">
                        <div class="left">
                            <svg class="icon" aria-hidden="true">
                                <use  xlink:href="#iconyouzi" ></use>
                            </svg>
                            <div>
                                魅力值：{{userdata.data.charisma}}亿
                            </div>
                        </div>
                        <div class="right">
                            <van-notice-bar  class="slidetar" >
                                欢迎来到主播{{userdata.data.username}}悦兔号为{{userdata.data.userid}}的房间，快去关注它把
                            </van-notice-bar>
                        </div>
                    </div>
<!--                    弹出来的礼物-->
                    <transition :enter-active-class="enterclass" :leave-active-class="leaveclass" mode="out-in" >
                        <div :class="giftclass"  v-show="outgift">
                        <!--                            礼物接口传值-->
                        <div v-if="receiveg" class="tran" >
                            <img :src="receiveg.data.userimage">
                            <span>感谢{{receiveg.data.username}}送出了一个{{receiveg.data.giftname}}</span>
                            <img :src="receiveg.data.giftimage">
                        </div>
                    </div>
                    </transition>

                    <div class="bottom" >
                       <div class="chat">
                           <div class="left" id="scrollleft">
                               <p>悦兔直播，悦兔提倡绿色直播环境，对直播内容24小时监控，
                                   任何违法违规、聚集闹事、抹黑诋毁、低俗不良行为将被封禁，传播正能量，从你我做起！</p>
                               <span>风险提示：悦兔平台严禁主播及任何人以返现、返利等诱导性方式引诱用户送礼
                                   或消费行为，如若发现，封号处理！</span>
                                   <a v-for="(n,i) in chatdata">
                                       <span>
                                           <a class="sva">
                                                <svg class="icon" aria-hidden="true">
                                                   <use :xlink:href="n.vipclass"></use>
                                                </svg>
                                           </a>
                                           <i >
                                              {{n.name}}
                                           </i>
                                           <a class="messa">{{n.message}}</a>
                                       </span>
                                   </a>
                           </div>
                           <div class="right">

                           </div>
                       </div>
                        <div class="close" v-if="flagbottom">
                            <div @click="popup">
                                <svg class="icon" aria-hidden="true">
                                    <use  xlink:href="#iconchat" ></use>
                                </svg>
                                <input type="text" placeholder="说点啥..."  >
                            </div>
                            <a class="share" @click="show=true">
                                <svg class="icon" aria-hidden="true">
                                    <use  xlink:href="#iconguanzhongshu" ></use>
                                </svg>
                            </a>
                            <a class="gift" @click="transhow" >
                                <svg class="icon" aria-hidden="true">
                                    <use  xlink:href="#iconliwu1" ></use>
                                </svg>
                            </a>
                            <a class="goout" href="javascript:history.back(-1)">
                                <svg class="icon" aria-hidden="true">
                                    <use  xlink:href="#iconclose" ></use>
                                </svg>
                            </a>
                        </div>
                        <div class="popup" v-if="popflag">
                            <input type="text" v-model="chatvalue">
                            <button @click="sendmessage">发送</button>
                        </div>
                    </div>
                    <div class="gold">
                        <div>ID:{{userdata.data.userid}}</div>
                        <img src="../../assets/img/h3.png">
                    </div>
                </swiper-slide>
        </swiper>
        <!--        观众列表-->
        <van-action-sheet v-model="show" title="观众列表" class="sharevant">
           <ShareVant :data="data.audiences"/>
        </van-action-sheet>
        <!--        礼物列表-->
        <van-popup v-model="giftshow" position="bottom"  :overlay-style="{background:'transparent'}" class="giftvant" :round="true">
            <div class="giftstyle">
                <div class="gift-top">
                    <a @click="flag=true" :class="flag==true?'active ':''">
                        <svg class="icon" aria-hidden="true">
                            <use  xlink:href="#iconicon-test" ></use>
                        </svg>
                        礼物
                    </a>
                    <a @click="flag=false" :class="flag==false?'active ':''">
                        <svg class="icon" aria-hidden="true">
                            <use  xlink:href="#iconbeibao" ></use>
                        </svg>
                        背包
                    </a>
                </div>
                <div v-if="flag" class="left">
                    <div class="gift-left-center">
                        <svg class="icon" aria-hidden="true">
                            <use  xlink:href="#iconliwu2" ></use>
                        </svg>
                        <van-notice-bar  class="gifttar" >
                            礼物多多，更有多多大礼物等你拿
                        </van-notice-bar>
                        <div class="openvip">
                            开通vip
                            <router-link to="user/nobility">
                                <svg class="icon" aria-hidden="true">
                                    <use  xlink:href="#iconSFAtubiao" ></use>
                                </svg>
                            </router-link>
                        </div>
                    </div>
                    <!--                    礼物-->
<!--                    <Gift :data="data.user.gifts" v-if="data.user" @gift="receivegift"></Gift>-->
                    <Gift v-if="giftdata" :data="giftdata.data.new"  @gift="receivegift"></Gift>
                    <div class="togift">
                            <router-link tag="p" to="/user/earnings">充值：0
                                    <svg class="icon" aria-hidden="true">
                                        <use  xlink:href="#iconxiangyou1" ></use>
                                    </svg>
                            </router-link>
                        <router-link tag="span" to="/user/earnings">
                             <span>
                            积分：0
                                <svg class="icon" aria-hidden="true">
                                   <use  xlink:href="#iconxiangyou" ></use>
                                </svg>
                        </span>
                        </router-link>
                        <a @click="sendgift">
                            发送
                        </a>
                    </div>
                </div>
                <div v-else class="right">
                    <Gift></Gift>
                </div>
            </div>
        </van-popup>
        <!--            主播详情-->
        <van-popup  v-model="usershow" class="uservant" position="bottom">
          <UserVant :data="data.anchorid"/>
        </van-popup>
        </div>
</template>

<script>
    import { NoticeBar } from 'vant';
    import { ActionSheet } from 'vant';
    import { Popup } from 'vant';
    import { Dialog } from 'vant';
    import Gift from "../../components/live/Gift";
    import UserVant from "../../components/live/UserVant";
    import ShareVant from "../../components/live/ShareVant";
    import GiftApi from "../../apis/Live/GiftApi";
    import SendgiftApi from "../../apis/Live/SendgiftApi";
    import UserApi from "../../apis/Live/UserApi";
    import $ from "jquery"
    export default {
        name: "Live",
        data() {
            return {
                userdata:null,
                giftclass:"transgift",
                enterclass:"animated bounceInLeft",
                leaveclass:"animated bounceOutRight",
                outgift:false,
                receiveg:null,
                popflag:false,
                chatdata:[{name:"张三是个小可爱",message:"主播好可爱主播好可爱主播好可爱主播好可爱",vipclass:"#iconyouzi"}],
                chatvalue:"",
                time:null,
                gift:null,
                giftindex:null,
                data:null,
                giftdata:null,
                flagbottom:true,
                show:false,
                flag:true,
                usershow:false,
                giftshow:false,
                swiperOption: {
                    noSwiping : true,
                    noSwipingSelector: '.user',
                    touchReleaseOnEdges:true,
                    initialSlide :2,
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...
                }
            }

        },
        beforeMount() {
            //当前页面数据
            this._initUserData("453453","444455")
            //接收礼物
            this._initGiftData()
            //模拟数据
            let a=require("../../../public/mocks/Live/Live")
            this.data=a
            console.log(this.data)
            //获取路由
            console.log(this.$route)
            //创建连接
            this.ws = new WebSocket("ws://10.36.176.135:8888/chat/?userid=453453&studiono=444444");
            this.ws.onopen = function (e) {
                console.log("客户端连接成功了！")
            }
            this.ws.onmessage = function (event) {
                console.log(event.data)
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        updated(){
            // 聊天定位到底部
            this.$nextTick(() => {
                var container = document.querySelector("#scrollleft");
                container.scrollTop = container.scrollHeight;
            })
        },
        components:{
            [NoticeBar.name]:NoticeBar,
            [ActionSheet.name]:ActionSheet,
            [Popup.name]:Popup,
            [Dialog.Component.name]: Dialog.Component,
            [Gift.name]:Gift,
            [UserVant.name]:UserVant,
            [ShareVant.name]:ShareVant,
        },
        methods:{
            //弹出打字框
            popup(){
                this.flagbottom=false
                this.popflag=true
            },
            classifyvipclass(c){
                switch (c) {
                    case "红v":
                        return "#iconvip";
                        break;
                    case "紫v":
                        return "#iconvip7";
                        break;
                    case "银冠":
                        return "#iconvip8";
                        break;
                    case "皇冠":
                        return "#iconvip9";
                        break;
                    case "钻冠":
                        return "#iconvip10";
                        break;
                    case "至尊":
                        return "#iconzhizunhuiyuan";
                        break;
                }
            },
            //对话框数据
            partabc(a){
               let b=a.split(":");
               console.log(b)
               let c= this.classifyvipclass(b[0])
                this.chatdata.push({name:b[1],message:b[2],vipclass:c})
            },
            //发送消息
            sendmessage(){
                if(this.chatvalue!=""){
                    //判断底部框是否消失
                    this.flagbottom=true
                    this.popflag=false
                    this.ws.onmessage =  (event)=> {
                        console.log(event.data)
                        this.partabc(event.data)
                    }
                    if(this.ws.readyState==1){
                        this.ws.send(this.chatvalue)
                    }
                    this.chatvalue=""
                }
             },
            //接收礼物
              async _initGiftData(){
                let data=await GiftApi.getGiftData()
                this.giftdata=data
                console.log(this.giftdata)
              },
            //发送礼物接收反馈
            async _initSendgiftData(){
                let data=await SendgiftApi.getmessageData("453453","444444","3")
                console.log(data)
                this.receiveg=data
                console.log(this.receiveg)
            },
            //用户进入直播直播页面
            async _initUserData(id,stu){
                let data= await  UserApi.getUserData(id,stu)
                this.userdata=data
                console.log(this.userdata)
            },
            //根据下标判断礼物特效
            judgegiftstyle(a){
                if(a>=5 && a<11){
                    this.enterclass="animated zoomIn"
                    this.leaveclass="animated zoomOut"
                    this.giftclass="transgift-s"
                }
                else if(a>=11 && a<=16){
                    this.enterclass="animated rollIn"
                    this.leaveclass="animated rollOut"
                    this.giftclass="transgift-th"
                }
                else{
                    this.enterclass="animated bounceInLeft"
                    this.leaveclass="animated bounceOutRight"
                    this.giftclass="transgift"
                }

            },
            //子传父接收礼物
            receivegift(a){
                this.judgegiftstyle(a)
                //将下标保存起来
                this.giftindex=a
            },
            //打开礼物弹出显示
            transhow(){
                this.giftshow=true;
                this.flagbottom=!this.giftshow
            },
            //发送礼物
            sendgift(){
                this._initSendgiftData()
                // if(所剩金币数>当前礼物金额){
                //
                // }
                //else{
                    // Dialog.confirm({
                    //     title: '余额不足',
                    //     message: '当前金币不足了呢，点击马上充值体验精彩！',
                    //     confirmButtonText:'前往充值',
                    // }).then(() => {
                    //     // on confirm
                    // }).catch(() => {
                    //     // on cancel
                    // });
                    //调用发送礼物的函数
                    //对金币数做判断
                //}
                this.outgift=true
                 clearTimeout(this.time)
                this.time=setTimeout(()=>{
                    this.outgift=false
                },2000)
            }
        },
        //监听组件的显示
        watch:{
            giftshow:{
                handler(){
                    this.flagbottom=!this.giftshow
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    $bgcolor:rgb(8,8,8,0.3);
    .top{
        position: absolute;
        top: 0;
        background-color:rgba(#a600ff,.2) ;
        height: 100vh;
        width: 100%;
    }
    .slide{
        background-color: rgba(3,255,255,.3);
        height: 100vh;
        /*position: absolute;*/
        /*top: 0;*/
    }
    .header{
        height: .6rem;
        width: 3.75rem;
        background-color: #0CCECE;
        display: flex;
        align-items: center;
        .infor{
            margin-left: .05rem;
            display: flex;
            background-color:$bgcolor;
            align-items: center;
            height: .4rem;
            width: 1.4rem;
            border-radius: .2rem;
            color: white;
          img{
              width: .3rem;
              height: .3rem;
              border-radius: 50%;
              margin-left: .1rem;
          }
            div:last-child{
                margin-left: .1rem;
                flex: 1;
                p{
                    font-size: .14rem;
                    width: .7rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow:ellipsis;
                }
                span{
                    display: block;

                }
            }
        }
        .focus{
            line-height: .6rem;
            margin-left: .05rem;
            span{
                background-color: white;
                padding: 0.05rem .07rem;
                border-radius: .2rem;
                color: #15e1d6;
            }
        }
        .user{
            display: flex;
            overflow-x: scroll;
            width: 1.6rem;
            &::-webkit-scrollbar{
                display:none;
            }
            img{
                margin-left: .05rem;
                width: .3rem;
                height: .3rem;
                border-radius: .2rem;
            }
        }
    }
    .center{
        height: .3rem;
        display: flex;
        align-items: center;
        .left{
            display: flex;
            color: white;
            background-color: $bgcolor ;
            margin-left: .05rem;
            display: flex;
            align-items: center;
            height: .26rem;
            padding: 0 .05rem;
            border-radius: .2rem;
           svg{
               width: .2rem;
               height: .2rem;
               margin-right: .05rem;
           }
        }
        .right{
            width: 2.5rem;
            .slidetar{
                height: .24rem;
                margin-left: .2rem;
                background-color: $bgcolor;
                border-radius: .2rem;
                color: white;
            }
        }
    }
    .transgift-s{
        height: 1rem;
        padding: .1rem;
        position: absolute;
        text-align: center;
        top: 2rem;
        .tran{
            border-radius: .2rem;
            padding: 0rem .1rem;
            position: relative;
            img:first-child{
                width: .4rem;
                height: .4rem;
                border-radius: 50%;
                position: absolute;
                top:-0.1rem;
                left: .7rem;
            }
            span{
                color: white;
                padding: 0.15rem .4rem;
                border-radius: .2rem;
                background-color: $bgcolor;
            }
            img:last-child{
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                margin-top: .2rem;
            }
        }

    }
    .transgift-th{
        position: absolute;
        top:2rem;
        left: .75rem;
        text-align: center;
        .tran{
            background-color: $bgcolor;
            border-radius: .2rem;
            padding: 0rem .1rem;
            img:first-child{
                width: .4rem;
                height: .4rem;
                border-radius: 50%;
            }
            span{
                display: flex;
                align-items: center;
                color: white;
                padding: 0rem .1rem;
            }
            img:last-child{
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 50%;
            }
        }

    }
    .transgift{
        height: 1rem;
        padding: .1rem;
        /*background-color: lightgoldenrodyellow;*/
        position: absolute;
        top:2rem;
        /*display: none;*/
        .tran{
            background-color: $bgcolor;
            border-radius: .2rem;
            display: flex;
            padding: 0rem .1rem;
            img:first-child{
                width: .4rem;
                height: .4rem;
                border-radius: 50%;
            }
            span{
                display: flex;
                align-items: center;
                color: white;
                padding: 0rem .1rem;
            }
            img:last-child{
                width: .4rem;
                height: .4rem;
                border-radius: 50%;
            }
        }
    }
    .bottom{
        width:100%;
        height:2.5rem;
        position: absolute;
        bottom: 0;
        .chat{
            display: flex;
            .left{
                width: 72%;
                height: 2rem;
                overflow-y: scroll;
                &::-webkit-scrollbar{
                      display:none;
                  }
              p{
                  background-color:$bgcolor;
                  margin: .05rem;
                  padding: .05rem;
                  border-radius: .1rem;
                  color: #0FE3ED;
                  line-height: .14rem;
              }
              >span{
                  display: block;
                  background-color:$bgcolor;
                  margin: .05rem;
                  padding: .05rem;
                  border-radius: .1rem;
                  color: #0FE3ED;
                  line-height: .14rem;
                }
                    >a{
                       color: white;
                       display: block;
                        >span{
                            background-color: $bgcolor;
                            border-radius: .1rem;
                            padding: .05rem .05rem;
                            margin-left: .05rem;
                            margin-top: .05rem;
                            display: inline-block;
                             i{
                                 display: inline-block;
                                 color: #0CCECE;
                              padding-bottom: .05rem;
                                 vertical-align: top;
                             }
                              .sva{
                                  display: inline-block;
                                  /*padding: .07rem .05rem;*/
                                  svg{
                                      width: .15rem;
                                      height: .15rem;
                                  }
                          }
                            .messa{
                                /*display: block;*/
                                /*flex:1;*/
                                margin-left: .05rem;
                                vertical-align: top;

                            }
                        }

                    }

            }
            .right{

            }
        }
        .close {
            width: 100%;
            height: .4rem;
            position: absolute;
            bottom: .1rem;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            div:first-child{
                width: 1rem;
                margin-left: .1rem;
                height: .24rem;
                background-color:$bgcolor;
                display: flex;
                border-radius: .2rem;
                svg{
                    width: .2rem;
                    height: .2rem;
                    margin-left: .1rem;
                    fill: white;
                }
                input{
                    width: .7rem;
                    border: none;
                    background-color:rgb(255,255,255,0);
                    margin-left: .05rem;
                    color: white;
                    &::placeholder{
                        color: white;
                    }

                }
            }
           .share{
               margin-left: 1.2rem;
               border-radius: 50%;
               background-color:$bgcolor;
               svg{
                   fill:white;
               }

           }
            .gift{
                /*background-color:*/
                background: linear-gradient(to right,#48f5f3,#03ceca);
                border-radius: 50%;
            }
            .goout{
                border-radius: 50%;
                background-color:$bgcolor;
                fill: white;
            }
           a{
               margin-left: .2rem;
               width: .3rem;
               height: .3rem;
               text-align: center;
               svg{
                   width: .2rem;
                   height: .2rem;
                   margin-top: .05rem;
               }
           }
        }
        .popup{
            display: flex;
            justify-content: space-around;
            background-color: white;
            padding: .05rem 0rem;
            input{
                width: 2rem;
                height: .3rem;
                -webkit-appearance: none;
                border: none;
                border-radius: .3rem;
                background-color: rgba(#000,.1);
                padding:0rem .2rem;
            }
            button{
                border: none;
                width: .6rem;
                height: .3rem;
                border-radius: .3rem;
                background-color: #0CCECE;
                color: white;
            }
        }
    }
    .giftvant{
        background-color: rgba(#000, .3);
        .giftstyle {
            width: 100%;
            height: 2.67rem;
            background-color: rgba(#000, .1);
            .gift-top {
                display: flex;
                .active{
                    background-color: rgba(#fff,.5);
                    color: yellow;
                }
                a{
                    display: flex;
                    height: .3rem;
                    align-items: center;
                    margin-left: .15rem;
                    border-radius: .2rem;
                    padding: 0 .1rem;
                    background-color: rgba(#fff, .3);
                    margin-top: .05rem;
                    color: white;
                    svg{
                        width: .15rem;
                        height: .15rem;

                    }
                }
            }
            .left {

                .gift-left-center {
                    display: flex;
                    align-items: center;
                    border-bottom: .01rem solid rgba(255,255,255,.3);
                    height: .3rem;
                    svg {
                        width: .2rem;
                        height: .2rem;
                        margin-left: .1rem;
                    }
                    .gifttar {
                        width: 2rem;
                        height: .24rem;
                        line-height: .24rem;
                        background-color: transparent;
                        border-radius: .2rem;
                        color: yellowgreen;
                        margin-left: .1rem;
                    }
                    .openvip{
                        margin-left: .35rem;
                        color: white;
                        display: flex;
                        align-items: center;
                        svg {
                            width: .1rem;
                            height: .1rem;
                        }
                    }
                }
                .togift{
                    color: white;
                    display: flex;
                    align-items: center;
                    height: .4rem;
                    font-size: .14rem;
                    svg{
                        width: .15rem;
                        height: .15rem;
                    }
                    p{
                        display: flex;
                        align-items: center;
                        width: .8rem;
                        justify-content: center;
                        color: #f4ea2a;
                        svg{

                        }
                    }
                    span{
                        display: flex;
                        align-items: center;
                        width: .8rem;
                        justify-content: center;
                    }
                    a{
                        background-color: #0CCECE;
                        padding:.05rem .15rem;
                        margin-left: 1.4rem;
                        border-radius: .2rem;
                    }
                }
            }
            .right{
                display: flex;
                flex-wrap: wrap;

                a{
                    width: 25%;
                    height: .8rem;
                    text-align: center;
                    img{
                        width: .4rem;
                        height: .4rem;
                        margin-top: .2rem;
                    }
                }
            }
        }
    }
    .gold{
        position: absolute;
        top:.95rem;
        right:0.1rem;
        color: peru;
        font-weight: 600;
        img{
            width: .2rem;
            height: .2rem;
            margin-left: .2rem;
        }
    }
</style>
